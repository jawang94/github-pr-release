var render = require("mustache").render;

module.exports = function releaseMessage(template, prs, pr_title) {
  var text = render(template, { pr_title, prs });
  var lines = text.split("\n");
  var title = lines[0];
  var body = lines.slice(1);

  return {
    title: title,
    body: body.join("\n"),
  };
};
