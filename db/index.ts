import mysql from "mysql";
// const Pool = require("pg").Pool;

export const initializaDb = () => {
  const PawsitiveMatch_URL =
    "postgres://default:4sXF1zjKuTfB@ep-small-shadow-37791384-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb";
  const PawsitiveMatch_PRISMA_URL =
    "postgres://default:4sXF1zjKuTfB@ep-small-shadow-37791384-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?pgbouncer=true&connect_timeout=15";
  const PawsitiveMatch_URL_NON_POOLING =
    "postgres://default:4sXF1zjKuTfB@ep-small-shadow-37791384.us-east-1.postgres.vercel-storage.com:5432/verceldb";
  const PawsitiveMatch_USER = "default";
  const PawsitiveMatch_HOST =
    "ep-small-shadow-37791384-pooler.us-east-1.postgres.vercel-storage.com";
  const PawsitiveMatch_PASSWORD = "4sXF1zjKuTfB";
  const PawsitiveMatch_DATABASE = "verceldb";
  const connection = mysql.createConnection({
    host: "db4free.net",
    user: "adusuperuser",
    password: "aduadmin",
    database: "pawsitivematchdb",
    port: 3306,
  });
  // const connection = mysql.createConnection({
  //   host: PawsitiveMatch_HOST,
  //   user: PawsitiveMatch_USER,
  //   password: PawsitiveMatch_PASSWORD,
  //   database: PawsitiveMatch_DATABASE,
  //   port: 5432,
  // });

  connection.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }

    console.log("connected as id " + connection.threadId);
  });

  // export const pool = new Pool({
  //   user: PawsitiveMatch_USER,
  //   host: PawsitiveMatch_HOST,
  //   database: PawsitiveMatch_DATABASE,
  //   password: PawsitiveMatch_PASSWORD,
  //   port: 5432,
  // });
};
