const dbSqlite = require("./dbSqliteConnection");

const createMessagesTable = async () => {
  try {
    await dbSqlite.schema.createTable("messages", (tableMessages) => {
      tableMessages.increments("id").primary();
      tableMessages.string("username", 50).notNullable();
      tableMessages.string("time", 30).notNullable();
      tableMessages.string("message", 200).notNullable();
    });
    dbSqlite.destroy();
  } catch (error) {
    console.log("Ocurrio el siguiente error: ", error);
    dbSqlite.destroy();
  }
};

createMessagesTable();