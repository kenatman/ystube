import express from "express";

const PORT = 4000;

const app = express();

app.get("/", (req, res) => res.send(`Home`));
app.get("/login", (req, res) => res.send(`Login`));

const handleListening = () => {
  console.log(`✅ Server Listening on port http://localhost:${PORT} 🚀`);
};

app.listen(PORT, handleListening);
