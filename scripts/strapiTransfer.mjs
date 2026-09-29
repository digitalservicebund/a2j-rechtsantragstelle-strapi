import { configDotenv } from "dotenv";
import { spawnSync } from "node:child_process";

export default function strapiTransfer() {
  configDotenv();
  const {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    STRAPI_TRANSFER_URL,
    STRAPI_TRANSFER_TOKEN,
  } = process.env;
  if (AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY) {
    console.error(
      "AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are set - aborting.",
    );
    process.exit(1);
  }
  if (!STRAPI_TRANSFER_URL || !STRAPI_TRANSFER_TOKEN) {
    console.error(
      "Missing STRAPI_TRANSFER_URL or STRAPI_TRANSFER_TOKEN - aborting.",
    );
    process.exit(1);
  }
  console.time("Transfer time");
  console.log("Beginning strapi transfer...");
  const result = spawnSync(
    "strapi", //NOSONAR
    [
      "transfer",
      "--from",
      STRAPI_TRANSFER_URL,
      "--from-token",
      STRAPI_TRANSFER_TOKEN,
    ],
    { stdio: "inherit" },
  );
  console.log("Strapi transfer complete.")
  console.timeEnd("Transfer time")
  process.exit(result.status ?? 1);
}

strapiTransfer()