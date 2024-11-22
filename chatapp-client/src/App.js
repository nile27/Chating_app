import "./App.css";
import InputField from "./components/InputField/InputField.jsx";
import socket from "./server.js";
import MessageContainer from "./components/MessageContainer/MessageContainer.js";
import { useEffect, useState } from "react";
function App() {
  const [user, setUser] = useState();
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  console.log("message List", messageList);
  useEffect(() => {
    socket.on("message", (message) => {
      setMessageList((prevState) => prevState.concat(message));
    });

    askUserName();
  }, []);

  const askUserName = () => {
    const userName = prompt("이름을 입력하시오");
    console.log("uuu", userName);

    socket.emit("login", userName, (res) => {
      if (res?.ok) {
        setUser(res.data);
      }
      console.log("Res", res);
    });
  };

  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit("sendMessage", message, (res) => {
      console.log("sendmessage", res);
    });
  };

  return (
    <div>
      <div className="App">
        <MessageContainer messageList={messageList} user={user} />
        <InputField
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default App;
