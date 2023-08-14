const mongoose = require("mongoose");
const dotenv = require("dotenv");
const server = require("./app");
const transaction = require("./controllers/transactionController");
dotenv.config({ path: "./config.env" });

// const DB = process.env.LOCAL_DB;

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB connected successfully");
  })
  .then(() => {
    const checkActiveDeposits = () => {
      transaction.checkActive();
    };

    // checkActiveDeposits();
  })
  .catch((err) => {
    console.log({ database_error: err });
  });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}...`);
});
