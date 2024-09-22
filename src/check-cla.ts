import { fetch } from "undici";
import * as core from "@actions/core";

export async function checkCLA(endpoint: string, username: string): Promise<boolean> {
  try {
    const response = await fetch(`${endpoint}?username=${username}`);
    const data = await response.json();

    if (typeof data === "object" && data !== null && "signed" in data) {
      return Boolean(data.signed);
    }

    throw new Error("Invalid response format");
  } catch (error) {
    core.warning(`Error checking CLA status: ${error}`);
    return false;
  }
}
