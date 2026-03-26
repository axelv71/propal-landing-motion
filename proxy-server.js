import http from "node:http";
import https from "node:https";
import fs from "node:fs";
import path from "node:path";

const TARGET_URL =
  "https://www.propal.io/fr/blog/proposition-commerciale-freelance";
const PORT = 3001;

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          return fetchPage(res.headers.location).then(resolve).catch(reject);
        }
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  // Serve local static files (bundle.js, etc.)
  if (req.url.startsWith("/dist/")) {
    const filePath = path.join(process.cwd(), req.url);
    if (fs.existsSync(filePath)) {
      res.writeHead(200, { "Content-Type": "application/javascript" });
      fs.createReadStream(filePath).pipe(res);
      return;
    }
  }

  try {
    const html = await fetchPage(TARGET_URL);
    // Inject bundle.js just before </body>
    const injected = html.replace(
      "</body>",
      '<script src="/dist/bundle.js"></script></body>',
    );
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(injected);
  } catch (err) {
    res.writeHead(500);
    res.end("Proxy error: " + err.message);
  }
});

server.listen(PORT, () => {
  console.log(`Proxy running at http://localhost:${PORT}`);
  console.log(`Proxying: ${TARGET_URL}`);
});
