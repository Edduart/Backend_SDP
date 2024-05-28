import { Sequelize } from "sequelize";

const Connect = process.env["MYSQL_NAME"] || "seminario";
const username = process.env["MYSQL_USER"] || "root";
const password = process.env["MYSQL_PASSWORD"] || "root";
const host = process.env["MYSQL_HOST"] || "localhost";

const sequelize = new Sequelize(Connect, username, password, {
  host: host,
  dialect: "mysql",
});

const dbConnectMySql = async () => {
  try {
    await sequelize.authenticate();
    console.log("conexion a mySQL exitosa");
  } catch (e) {
    console.log("Error en la conexion a la base de datos:");
    console.log(e);
  }
};


export { sequelize, dbConnectMySql };
