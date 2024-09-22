import * as core from "@actions/core";
import * as github from "@actions/github";

export async function run(): Promise<void> {
  try {
    const token = core.getInput("github-token", { required: true });
    const claEndpoint = core.getInput("cla-endpoint", { required: true });
    const claLink = core.getInput("cla-link", { required: true });

    const octokit = github.getOctokit(token);
    const context = github.context;
    const { owner, repo } = context.repo;
    const pullRequest = context.payload.pull_request;

    if (!pullRequest) {
      core.setFailed("This action can only be run on pull requests");
      return;
    }

    const { data: pullRequests } = await octokit.rest.pulls.list({
      owner,
      repo,
      state: "all",
      creator: pullRequest?.user?.login,
    });

    // const isFirstPRForUser = pullRequests.length === 1;
    const isFirstPR = pullRequests.length > 1;
    // dummy 3

    if (isFirstPR) {
      await octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number: pullRequest.number,
        body: `Welcome @${pullRequest.user?.login}! Thank you for your first contribution to this project.`,
      });
    }

    core.debug(`CLA Endpoint: ${claEndpoint}`);
    core.debug(`CLA Link: ${claLink}`);
    core.debug(`Context: ${context}`);
    core.debug(`Pull Request: ${pullRequest}`);

    console.log("Hello World");
    console.log(`Pull Request: ${pullRequest}`);
    console.log(`Pull Request Number: ${pullRequest?.number}`);
    console.log(`Pull Request Title: ${pullRequest?.title}`);
    console.log(`Pull Request Body: ${pullRequest?.body}`);
    console.log(`Pull Request Author: ${pullRequest?.user?.login}`);
    console.log(`Pull Request Author ID: ${pullRequest?.user?.id}`);
    console.log(`Pull Request Author Login: ${pullRequest?.user?.login}`);

    console.log("----------------------------------------");
    console.log(`Context: ${context.repo}`);
    console.log(`Context: ${context.repo.owner}`);
    console.log(`Context: ${context.repo.repo}`);
    console.log(`Context: ${context.repo.owner}`);
    console.log("----------------------------------------");

    console.log(`Owner: ${owner}`);
    console.log(`Repo: ${repo}`);
    console.log(`CLA Endpoint: ${claEndpoint}`);
    console.log(`CLA Link: ${claLink}`);
    console.log(`Context: ${context}`);
    console.log(`Pull Request: ${pullRequest}`);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}
