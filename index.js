const { createServer } = require("cors-anywhere");
require("dotenv").config();

const PORT = process.env.PORT || 7000;
const HOST = process.env.HOST || "0.0.0.0";

const app = createServer({
  originWhiteList: ["https://awesome-bohr-74e2aa.netlify.com"],
  requireHeader: ["origin", "x-requested-with"],
  removeHeaders: ["cookie", "cookie2"]
});

app.listen(PORT, HOST, () => {
  console.log(`Running Proxy Server on ${HOST}:${PORT}`);
});
