const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user.router");
const taskRouter = require("./routers/task.router");

const app = express();
const PORT = process.env.PORT;

const multer = require("multer");
const upload = multer({
  dest: "images",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    // if (!file.originalname.endsWith(".pdf")) {
    //   return cb(new Error("please upload a pdf"));
    // }
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error("Please upload a Word document"));
    }

    cb(undefined, true);
    // cb(new Error("File must be a ..."));
    // cb(undefined, true);
    // cb(undefined, false);
  },
});

app.post(
  "/upload",
  upload.single("upload"),
  (req, res) => {
    res.send(200);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () => {
  console.log("Server is up on port " + PORT);
});

// MIDDLEWARES
// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     req.send("GET requests are disabled");
//   } else next();
// });

// app.use((req, res, next) => {
//   res.status(503).send("Site is currently down. Check back soon");
// });

// const Task = require("./models/task.model");
// const User = require("./models/user.model");

// const main = async () => {
//   const task = await Task.findById("5f10c58df1389c1b739f8c11");
//   await task.populate("owner").execPopulate();
//   console.log(task);

//   const user = await User.findById("5f10c45091ee711b5db3c532");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };
// // main();
