import "./App.css";
import socket from "./server.js";
import { useEffect, useState } from "react";
function App() {
  const [user, setUser] = useState();

  useEffect(() => {
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

  return (
    <div>
      <div className="App"></div>
    </div>
  );
}

export default App;
