const http = require("http");
const app = require("./app");
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const connectToDb = require("./db/db");
const { initializeSocket } = require("./Socket");
connectToDb();
initializeSocket(server);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
