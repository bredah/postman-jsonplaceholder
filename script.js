const newman = require("newman");

const environments = Object.freeze({
  live: "JSONPlaceholder.live.environment.json",
  dev: "JSONPlaceholder.dev.environment.json",
});

const environment = environments[process.env.APP_ENV];

if (!environment) {
  console.error("The current environment does not exist:", process.env.APP_ENV);
  return;
}

console.log(
  `Running the collection in the ${process.env.APP_ENV} environment!`
);

newman.run(
  {
    collection: "./JSONPlaceholder.collection.json", // Collection URL from a public link or the Postman API can also be used
    environment: "./" + environment,
    reporters: ["cli", "htmlextra"],
    iterationCount: 1,
    reporter: {
      htmlextra: {
        export: "./newman/report.html",
        // template: './template.hbs'
        // logs: true,
        // showOnlyFails: true,
        // noSyntaxHighlighting: true,
        // testPaging: true,
        // browserTitle: "My Newman report",
        title: "Newman Report Example",
        // titleSize: 4,
        // omitHeaders: true,
        // skipHeaders: "Authorization",
        // hideRequestBody: ["Login"],
        // hideResponseBody: ["Auth Request"],
        // showEnvironmentData: true,
        // skipEnvironmentVars: ["API_KEY"],
        // showGlobalData: true,
        // skipGlobalVars: ["API_TOKEN"],
        // skipSensitiveData: true,
        // showMarkdownLinks: true,
        // showFolderDescription: true,
        timezone: "Europe/Madrid",
      },
    },
  },
  function (err) {
    if (err) {
      throw err;
    }
    console.log("Collection run complete!");
  }
);
