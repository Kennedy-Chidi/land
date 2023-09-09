const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const xss = require("xss-clean");
const cors = require("cors");
const globalErrorHandler = require("./controllers/errorController");

const aboutRouter = require("./routes/aboutRoutes");
const bannerRouter = require("./routes/bannerRoutes");
const blogRouter = require("./routes/blogRoutes");
const companyRouter = require("./routes/companyRoutes");
const currencyRouter = require("./routes/currencyRoutes");
const emailRouter = require("./routes/emailRoutes");
const eventRouter = require("./routes/eventRoutes");
const faqRouter = require("./routes/faqRoutes");
const partnerRouter = require("./routes/partnerRoutes");
const planRouter = require("./routes/planRoutes");
const productRouter = require("./routes/productRoutes");
const referralRouter = require("./routes/referralRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const signupRouter = require("./routes/signupRoutes");
const staffRouter = require("./routes/staffRoutes");
const transactionRouter = require("./routes/transactionRoutes");
const termsRouter = require("./routes/termsRoutes");
const userRouter = require("./routes/userRoutes");
const walletRouter = require("./routes/walletRoutes");

const userController = require("./controllers/userController");
dotenv.config({ path: "./config.env" });

// const chokidar = require("chokidar");

// const watcher = chokidar.watch(
//   "/app/controllers/transactionController.js",
//   "/app/utils/email.js",
//   "/app/routes",
//   "/app/routes",
//   "/app/app.js",
//   "/app/uploads/bitcoinbtclogo_1682855641849.svg",
//   "/app/config.env",
//   {
//     ignored: /[\/\\]\./, // ignore dotfiles
//     persistent: true, // keep the process running
//   }
// );

// watcher
//   .on("add", (path) => console.log(`File ${path} has been added`))
//   .on("change", (path) => console.log(`File ${path} has been changed`))
//   .on("unlink", (path) => console.log(`File ${path} has been removed`));

const app = express();
app.use(morgan("dev"));

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected");
  userController.fetchUsers(io, socket);
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(xss());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/about", aboutRouter);
app.use("/api/banner", bannerRouter);
app.use("/api/blog", blogRouter);
app.use("/api/company", companyRouter);
app.use("/api/currency", currencyRouter);
app.use("/api/emails", emailRouter);
app.use("/api/events", eventRouter);
app.use("/api/faq", faqRouter);
app.use("/api/partners", partnerRouter);
app.use("/api/plans", planRouter);
app.use("/api/products", productRouter);
app.use("/api/referrals", referralRouter);
app.use("/api/review", reviewRouter);
app.use("/api/signup", signupRouter);
app.use("/api/staffs", staffRouter);
app.use("/api/terms", termsRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/users", userRouter);
app.use("/api/wallet", walletRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/dist/")));
  app.get("*", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
  });
}

app.use(globalErrorHandler);

module.exports = server;
