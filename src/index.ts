import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import { initializaDb } from "../db";
import mysql from "mysql";
import { v4 as uuid } from "uuid";

// import { initializaDb } from "../db";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(express.json());

const connection = mysql.createConnection({
  host: "db4free.net",
  user: "adusuperuser",
  password: "aduadmin",
  database: "pawsitivematchdb",
  port: 3306,
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.post("/user/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username) {
    res.send({ status: "error", message: "username was not provided" });
    return;
  }
  if (!password) {
    res.send({ status: "error", message: "password was not provided" });
    return;
  }

  connection.query(
    `Select * from user where username = '${username}' and password = '${password}'`,
    function (error, results, fields) {
      if (error) throw error;
      // connected!
      // res.send(results);
      // return;
      console.log("login ", results);
      if (results.length) {
        res.send({ status: "success" });
      } else {
        res.send({ status: "error", message: "Wrong username or password" });
      }
    }
  );
});

app.post("/user/signup", (req: Request, res: Response) => {
  let usernameNotAvailable = false;
  const { username, password, emailId } = req.body;
  const uniqueId = uuid();

  if (!username) {
    res.send({ status: "error", message: "username was not provided" });
    return;
  }
  if (!password) {
    res.send({ status: "error", message: "password was not provided" });
    return;
  }
  if (!emailId) {
    res.send({ status: "error", message: "EmailID was not provided" });
    return;
  }

  const d = connection.query(
    `Select * from user where username = '${username}' and password = '${password}'`,
    function (error, results, fields) {
      if (error) throw error;
      // connected!
      // res.send(results);
      // return;
      console.log("login ", results);
      if (results.length) {
        usernameNotAvailable = true;
      }
    }
  );

  if (usernameNotAvailable) {
    res.send({ status: "error", message: "Username Already Taken" });
    return;
  }

  connection.query(
    `  INSERT INTO user (id, username, password, emailId) VALUES ('${uniqueId}', '${username}', '${password}', '${emailId}');`,
    function (error, results, fields) {
      if (error) throw error;
      // connected!
      console.log("Sign up result ", results);
      res.send({ status: "success", message: "Signed Up Successfully!" });
    }
  );
});

// app.get("/login", (req: Request, res: Response) => {
//   console.log("user end started");
//   initializaDb();
//   // pool.

//   connection.query(
//     "  INSERT INTO user (id, username, password, emailId) VALUES ('1', 'relson2', 'password', 'email');",
//     function (error, results, fields) {
//       if (error) throw error;
//       // connected!
//     }
//   );
//   connection.end();
//   res.send("user trying to login");
// });

app.listen(port, () => {
  // initializaDb();
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
