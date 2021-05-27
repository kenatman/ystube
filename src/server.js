import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();

const logger = morgan("dev");
app.use(logger);

const globalRouter = express.Router();
const handleHome = (req, res) => res.send(`HOME`);
globalRouter.get("/", handleHome);

const userRouter = express.Router();
const handleUserEdit = (req, res) => res.send(`USER-EDIT`);
userRouter.get("/edit", handleUserEdit);

const videoRouter = express.Router();
const handleVideoWatch = (req, res) => res.send(`VIDEO-WATCH`);
videoRouter.get("/watch", handleVideoWatch);

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const handleListening = () => {
  console.log(`✅ Server Listening on port http://localhost:${PORT} 🚀`);
};

app.listen(PORT, handleListening);
