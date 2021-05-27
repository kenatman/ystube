import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();

const handleHome = (req, res) => {
  res.send(`HOME`);
};

const logger = morgan("dev");

app.use(logger);
app.get("/", handleHome);
app.get("/protected", (req, res) => res.send(`locked`));

const handleListening = () => {
  console.log(`✅ Server Listening on port http://localhost:${PORT} 🚀`);
};

app.listen(PORT, handleListening);
