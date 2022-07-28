
import dbChat from "../db/dbSqliteConnection.js";


class Mensajes {
  constructor(db) {
    this.db = db;
  }
  async addMsgToDB(msgInfo) {
    try {
      await dbChat("messages").insert(msgInfo);
    } catch (error) {
      console.log(
        "Ocurrio el siguiente error al querer agregar el mensaje a la base: ",
        error
      );
    }
  }
  async getAllMsgs() {
    try {
      const msgsAll = await dbChat.select("*").from("messages");
      return msgsAll;
    } catch (error) {
      console.log(
        "Ocurrio el siguiente error al querer obtener los mensajes de la base: ",
        error
      );
    }
  }
}


export default Mensajes;