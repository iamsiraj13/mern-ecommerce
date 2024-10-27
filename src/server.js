const app = require("./app");
const connectDB = require("./config/dbConnect");
const { serverPort } = require("./secret");

// server listen
app.listen(serverPort, async () => {
  console.log("Server running");
  await connectDB();
});
