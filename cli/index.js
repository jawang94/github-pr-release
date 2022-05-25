#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv))
  .usage("Usage: $0 [repo]")
  .example("$0 uiur/github-pr-release --head dev --base master", "")
  .demandCommand(1)
  .default("head", "dev")
  .default("base", "master")
  .default("pr_title", "[Release] Major/Minor/Patch [...]").argv;

const createReleasePR = require("../");

async function main() {
  const repoInput = argv._[0];
  const [owner, repo] = repoInput.split("/");
  const config = {
    owner,
    repo,
    head: argv.head,
    base: argv.base,
    pr_title: argv.pr_title
  };

  const pullRequest = await createReleasePR(config);

  console.log(pullRequest.html_url);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
