import express from "express";
import cors from "cors";
import qr from "qr-image";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate-qr", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  // Create QR image and save to file (like your old script)
  const qr_png = qr.image(url, { type: "png" });
  const qrPath = "qr_img.png";
  const writeStream = fs.createWriteStream(qrPath);
  qr_png.pipe(writeStream);

  // Save URL to text file
  fs.writeFile("URL.txt", url, (err) => {
    if (err) {
      console.error(err);
    }
  });

  // Also stream QR image back in the response
  res.setHeader("Content-Type", "image/png");
  const qrStream = qr.image(url, { type: "png" });
  qrStream.pipe(res);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
