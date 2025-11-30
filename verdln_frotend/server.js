const express = require("express");
const next = require("next");
const path = require("path");

const PORT = process.env.PORT || 3000;
const dev = false;

const app = next({ dev, hostname: "localhost", port: PORT });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use("/public", express.static(path.join(__dirname, "public")));

  server.all("*", (req, res) => handle(req, res));

  server.listen(PORT, () => {
    console.log(`Next.js SSR running on port ${PORT}`);
  });
});
