import express from "express";

const PORT = 4000;

const app = express();

const handleHome = (req, res) => {
  res.send(`HOME`);
};

const urlLogger = (req, res, next) => {
  console.log(`PATH : ${req.path}`);
  next();
};

const timeLogger = (req, res, next) => {
  req.timeLogger = new Date();
  console.log(
    `${req.timeLogger.getFullYear()}.${
      req.timeLogger.getMonth() + 1
    }.${req.timeLogger.getDate()}`
  );
  next();
};

const securityLogger = (req, res, next) => {
  if (req.protocol === `https`) {
    console.log(`Secure 🎉`);
    next();
  } else {
    console.log(`Insecure 💩`);
    next();
  }
};

const protector = (req, res, next) => {
  if (req.url === "/protected") {
    console.log(`It is protected!!`);
    res.end();
  } else {
    next();
  }
};

app.use(urlLogger, timeLogger, securityLogger, protector);
app.get("/", handleHome);
app.get("/protected", (req, res) => res.send(`locked`));

const handleListening = () => {
  console.log(`✅ Server Listening on port http://localhost:${PORT} 🚀`);
};

app.listen(PORT, handleListening);
