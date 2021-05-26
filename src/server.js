import express from "express";

const PORT = 4000;

const app = express();

const logger = (req, res, next) => {
  console.log(`${req.method} : ${req.url}`);
  next();
};

const protecter = (req, res, next) => {
  if (req.url === `/protected`) {
    return res.send(`<h1>It is locked</h1>`);
  }
  console.log(`keep going...`);
  next();
};

const handleHome = (req, res) => {
  res.send(`handleHome`);
};
app.use(logger);
app.use(protecter);
app.get("/", handleHome);
app.get("/protected", (req, res) => res.send(`This is private lounge!!!`));

const handleListening = () => {
  console.log(`✅ Server Listening on port http://localhost:${PORT} 🚀`);
};

app.listen(PORT, handleListening);
