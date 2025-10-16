const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://library-management-system-full-stac.vercel.app",
    ],
  })
);

require("dotenv").config();
PORT = process.env.PORT;
const ConnectDb = require("./database/db");
ConnectDb();
const BookRouter = require("./Router/books.routes");
const UserRouter = require("./Router/User.routes");
app.use(express.json());
app.use("/Lib", BookRouter);
app.use("/Lib/user", UserRouter);
app.listen(PORT, () => console.log(`server started at port ${PORT}`));
