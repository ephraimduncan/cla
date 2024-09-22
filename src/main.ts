import * as core from "@actions/core";

export async function wait(milliseconds: number): Promise<string> {
  return new Promise((resolve) => {
    if (Number.isNaN(milliseconds)) {
      throw new Error("milliseconds not a number");
    }

    setTimeout(() => resolve("done!"), milliseconds);
  });
}

export async function run(): Promise<void> {
  try {
    const ms: string = core.getInput("milliseconds");

    core.debug(`Waiting ${ms} milliseconds ...`);

    core.debug(new Date().toTimeString());
    await wait(Number.parseInt(ms, 10));
    core.debug(new Date().toTimeString());

    core.setOutput("time", new Date().toTimeString());
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}
