import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

import "./Chat.css";

const socket = io.connect("http://localhost:3001");

function Chat() {
  
  const divRef = useRef(null);
  const [mensaje, setMensaje] = useState("");
  const [usuario, setUsuario] = useState("");
  const [arrayMensajes, setArrayMensajes] = useState([]);
  
  useEffect(() => {
    socket.on("server:msgs", (mensajes) => {
      setArrayMensajes(mensajes);
    });
    return () => {
      socket.off();
    };
  }, [arrayMensajes]);
  function sendMsg(msgInfo) {
    socket.emit("client:msg", msgInfo);
    setMensaje("");
  }
  const handleSubmitMsg = (e) => {
    e.preventDefault();
    const timeStamp = new Date();
    const fechayhora = timeStamp.toLocaleString("fr-FR");
    const msgInfo = { username: usuario, time: fechayhora, message: mensaje };
    sendMsg(msgInfo);
  };
  useEffect(() => {
    divRef.current.scrollIntoView({ bloc: "end", behavior: "smooth" });
  }, [arrayMensajes]);
  
  return (
    <section className="sect">
      <h2>Chat</h2>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10">
          <div id="msgsPool">
            {arrayMensajes ? (
              arrayMensajes.map((msgInfo, i) => (
                <div key={i}>
                  <span className="msgsPool-user">{msgInfo.username}</span>[
                  <span className="msgsPool-date">{msgInfo.time}</span>]:
                  <span className="msgsPool-msg">{msgInfo.message}</span>
                </div>
              ))
            ) : (
              <div>No hay mensajes en el chat. Se el primero! :D</div>
            )}
            <div ref={divRef}></div>
          </div>
          <form
            id="msgForm"
            autoComplete="off"
            className="col-12"
            onSubmit={handleSubmitMsg}
          >
            <div className="mb-3 row">
              <div className="col-6">
                <label htmlFor="username" className="form-label">
                  Usuario
                </label>
                <input
                  id="usernameInput"
                  type="email"
                  className="form-control"
                  placeholder="Ingrese una dirección de correo electrónico"
                  name="username"
                  required
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                />
              </div>
              <div className="col-6">
                <label htmlFor="msg" className="form-label">
                  Mensaje
                </label>
                <input
                  id="msgInput"
                  type="text"
                  className="form-control"
                  placeholder="Ingrese el mensaje a enviar"
                  name="msg"
                  maxLength={200}
                  required
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-dark">
              Enviar
            </button>
          </form>
        </div>
        <div className="col-1"></div>
      </div>
    </section>
  );
}

export default Chat;