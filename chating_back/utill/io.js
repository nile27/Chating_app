const chatController = require("../Controller/chat.controller");
const userController = require("../Controller/user.controller");

module.exports = function (io) {
  // io
  io.on("connection", async (socket) => {
    console.log("client is connected", socket.id);

    socket.on("login", async (userName, callback) => {
      try {
        const user = await userController.saveUser(userName, socket.id);
        const welcomeMessage = {
          chat: `${user.name} is joined to this room`,
          user: { id: null, name: "system" },
        };
        io.emit("message", welcomeMessage);
        callback({
          ok: true,
          data: user,
        });
      } catch (error) {
        callback({
          ok: false,
          data: error.message,
        });
      }
    });

    socket.on("sendMessage", async (message, callback) => {
      try {
        // user findFunc
        const user = await userController.checkUser(socket.id);
        // message save
        const newMessage = await chatController.saveChat(message, user);
        io.emit("message", newMessage);
        console.log(newMessage);
        callback({ ok: true });
      } catch (error) {
        callback({
          ok: false,
          data: error.message,
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("user is disconneted");
    });
  });
};
