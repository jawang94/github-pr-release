import { render } from "mustache";

interface ReleaseMessage {
  title: string;
  body: string;
}

export default function releaseMessage(
  template: string,
  prs: any[],
  pr_title: string
): ReleaseMessage {
  const text: string = render(template, { pr_title, prs });
  const lines = text.split("\n");
  const title = lines[0];
  const body = lines.slice(1);

  return {
    title: title,
    body: body.join("\n"),
  };
}
