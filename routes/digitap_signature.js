const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

router.post("/generate_signature", async function (req, res) {
  let payload = req.body.payload;

  const encryptStringWithRsaPublicKey = function (
    toEncrypt,
    relativeOrAbsolutePathToPublicKey
  ) {
    const absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
    const publicKey = fs.readFileSync(absolutePath, "utf8");
    const buffer = Buffer.from(toEncrypt);
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted;
  };

  let secret = JSON.stringify(payload);

  let hash = crypto.createHash("sha256").update(secret).digest("hex");

  let encryptedData = encryptStringWithRsaPublicKey(
    hash,
    "./uifintech_demo.pem"
  );

  let signature = encryptedData.toString("hex");

  console.log("signature : ", signature);

  return res.status(200).json({
    success: true,
    signature: `${signature}`,
  });
});

module.exports = router;
