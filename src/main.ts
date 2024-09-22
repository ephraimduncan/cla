import * as core from "@actions/core";
import * as github from "@actions/github";

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
    const token = core.getInput("github-token", { required: true });
    const claEndpoint = core.getInput("cla-endpoint", { required: true });
    const claLink = core.getInput("cla-link", { required: true });

    const octokit = github.getOctokit(token);
    const context = github.context;
    const { owner, repo } = context.repo;
    const pullRequest = context.payload.pull_request;

    core.debug(`CLA Endpoint: ${claEndpoint}`);
    core.debug(`CLA Link: ${claLink}`);
    core.debug(`Context: ${context}`);
    core.debug(`Pull Request: ${pullRequest}`);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}
