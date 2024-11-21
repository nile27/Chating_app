const userController = require("../Controller/user.controller");

module.exports = function (io) {
  // io
  io.on("connection", async (socket) => {
    console.log("client is connected", socket.id);

    socket.on("login", async (userName, callback) => {
      try {
        const user = await userController.saveUser(userName, socket.id);
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

    socket.on("disconnect", () => {
      console.log("user is disconneted");
    });
  });
};
