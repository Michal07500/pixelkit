// Higgsfield SDK example: text-to-video with Seedance 2.5.
//
// Run:  npm run seedance
// Needs HF_CREDENTIALS="key-id:key-secret" in .env.local (never committed).

import { config as loadEnv } from "dotenv";
import {
  createHiggsfieldClient,
  APIError,
  AuthenticationError,
  CredentialsMissedError,
  NotEnoughCreditsError,
  TimeoutError,
  ValidationError,
} from "@higgsfield/client/v2";

loadEnv({ path: ".env.local", quiet: true });

const MODEL = "bytedance/seedance-2.5/text-to-video";

async function main(): Promise<number> {
  const credentials = process.env.HF_CREDENTIALS;
  if (!credentials || !credentials.includes(":")) {
    console.error("HF_CREDENTIALS is missing or not in key-id:key-secret format. Add it to .env.local.");
    return 1;
  }

  const client = createHiggsfieldClient({
    credentials,
    // Video generation can take several minutes; the SDK default stops waiting after 5.
    maxPollTime: 15 * 60 * 1000,
    pollInterval: 5000,
  });

  console.log(`Submitting ${MODEL}…`);
  const result = await client.subscribe(MODEL, {
    input: {
      prompt: "A cinematic scene at sunset",
      duration: 5,
      resolution: "720p",
      aspect_ratio: "16:9",
    },
    withPolling: true,
  });

  // The API may report statuses beyond the SDK's declared union (e.g. "canceled").
  const status = String(result.status);
  const id = result.request_id;

  switch (status) {
    case "completed":
      if (!result.video?.url) {
        console.error(`Request ${id} completed but returned no video URL.`);
        return 1;
      }
      console.log(`Done. Request ${id}`);
      console.log(`Video URL: ${result.video.url}`);
      return 0;
    case "nsfw":
      console.error(`Request ${id} was rejected by moderation (credits are refunded).`);
      return 1;
    case "failed":
      console.error(`Request ${id} failed (credits are refunded).`);
      return 1;
    case "canceled":
    case "cancelled":
      console.error(`Request ${id} was canceled.`);
      return 1;
    default:
      console.error(`Request ${id} ended in unexpected status "${status}".`);
      return 1;
  }
}

main()
  .then((code) => process.exit(code))
  .catch((err: unknown) => {
    if (err instanceof CredentialsMissedError || err instanceof AuthenticationError) {
      console.error("Authentication failed. Check HF_CREDENTIALS in .env.local.");
    } else if (err instanceof NotEnoughCreditsError) {
      // The SDK maps every HTTP 403 to NotEnoughCreditsError, so this is ambiguous.
      console.error(
        "Request refused with HTTP 403. Either the account is out of credits, the key lacks access, " +
          "or a network proxy/firewall is blocking api.higgsfield.ai.",
      );
    } else if (err instanceof ValidationError) {
      console.error("The API rejected the input:", JSON.stringify(err.details ?? err.message));
    } else if (err instanceof TimeoutError) {
      // Also how a canceled request surfaces: the SDK keeps polling until maxPollTime.
      console.error("Gave up waiting for the result:", err.message);
    } else if (err instanceof APIError) {
      console.error(`Higgsfield API error${err.statusCode ? ` (${err.statusCode})` : ""}: ${err.message}`);
    } else {
      console.error("Request failed:", err instanceof Error ? err.message : err);
    }
    process.exit(1);
  });
