import express from "express";

const PORT = 4000;

const app = express();

const middleware = (req, res, next) => {
  console.log(`Trying to reach : ${req.url}`);
  next();
};

const handleHome = (req, res) => {
  res.send(`handleHome`);
};

app.get("/", middleware, handleHome);

const handleListening = () => {
  console.log(`✅ Server Listening on port http://localhost:${PORT} 🚀`);
};

app.listen(PORT, handleListening);
