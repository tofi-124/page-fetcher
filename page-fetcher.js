var argv = process.argv;
argv = argv.splice(2);

let webSite = argv[0];
let filePath = argv[1];

const fs = require("fs");

const pageFetcher = function (error, response, body) {
  const content = body;

  if (content === undefined) {
    console.log(error);
    return;
  }
  const contentSize = encodeURI(body).split(/%..|./).length - 1;

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error(err);
      return;
    } else
      console.error(`Downloaded and saved ${contentSize} bytes to ${filePath}`);
  });
};

const request = require("request");
request(webSite, (error, response, body) => {
  pageFetcher(error, response, body);
});
