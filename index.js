const { context, getOctokit } = require("@actions/github");
const axios = require("axios");

const trigger = "/fabletest";

const token = process.env.GITHUB_TOKEN;
const github = getOctokit(token);

if (context.eventName === "pull_request") {
  github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: `<img src="https://github.com/Brightspace/fable-automation/raw/main/images/fable-icon.png" alt="" width="13" /> Fable testing is available for this workflow. <img src="https://github.com/Brightspace/fable-automation/raw/main/images/fable-icon.png" alt="" width="13" />
Comment with **/fabletest** to request testing.
    
Your **[Fable Automation](https://github.com/Brightspace/fable-automation)** bot ♿️🤖`,
  });
} else if (
  context.eventName === "issue_comment" &&
  context.payload.issue.pull_request
) {
  const body = context.payload.comment.body;
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (String(body) === trigger) {
    async function run() {
      const actorSlackEmail =
        context.payload.sender?.type === "User"
          ? String(
              (await github.request({ url: context.payload.sender.url })).data
                .name
            )
              .replace(" ", ".")
              .toLowerCase()
              .concat("@d2l.com")
          : "";

      const payload = {
        "Repo name": context.payload.repository.full_name,
        "PR link": context.payload.issue.pull_request.html_url,
        "Actor name":
          context.payload.sender?.login || context.payload.sender.type,
        "Actor Slack Email": actorSlackEmail,
      };

      await axios.post(slackWebhookUrl, payload);

      github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: `<img src="https://github.com/Brightspace/fable-automation/raw/main/images/fable-icon.png" alt="" width="13" /> A request has been submitted to the [<img src="https://github.com/Brightspace/fable-automation/raw/main/images/slack-icon.png" alt="" width="13" /> #fable-automation slack channel](https://d2l.slack.com/archives/C03JYT1RJQP) <img src="https://github.com/Brightspace/fable-automation/raw/main/images/fable-icon.png" alt="" width="13" />.

Go to the [<img src="https://github.com/Brightspace/fable-automation/raw/main/images/slack-icon.png" alt="" width="13" /> #fable-automation slack channel](https://d2l.slack.com/archives/C03JYT1RJQP) to continue the workflow.
    
Your **[Fable Automation](https://github.com/Brightspace/fable-automation)** bot ♿️🤖`,
      });
    }
    run();
  }
}
