import { IncomingMessage, ServerResponse } from "http";
import fs from "fs";
import path from "path";

const filePath = path.resolve(".", "pages/api/privacy.pdf");

function Privacy(req: IncomingMessage, res: ServerResponse) {
  const fileBuffer = fs.readFileSync(filePath);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/pdf");
  res.end(fileBuffer);
}

export default Privacy;
