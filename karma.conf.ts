interface IchangeDebugOpts {
  instrumentation: boolean,
  browsers: string[],
  reporters: string[],
  reports: {
    "text-summary"?: string,
    text?: string
  }
}

let changeDebugOpts: IchangeDebugOpts = {
  instrumentation: true,
  browsers: ["ChromeHeadless"],
  reporters: ["karma-typescript", "super-dots"],
  reports: {"text-summary": ""}
}

if (process.argv.some(arg => arg === "--detail" )) {
  changeDebugOpts.reporters = ["karma-typescript", "spec"]
  delete changeDebugOpts.reports
  changeDebugOpts.reports = {text: ""}
}

if (process.argv.some(arg => arg === "--debug" )) {
  changeDebugOpts.instrumentation = false
  changeDebugOpts.browsers = ["Chrome"]
  changeDebugOpts.reporters = ["spec"]
}

export default config => {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "karma-typescript"],
    files: [
      "src/**/*.ts"
    ],
    exclude: [],
    preprocessors: {
      "src/**/*.ts": ["karma-typescript", "sourcemap"]
    },
    mime: {
      "text/x-typescript": ["ts"]
    },
    reporters: changeDebugOpts.reporters,
    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
    //    config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    browsers: changeDebugOpts.browsers,
    concurrency: Infinity,
    coverageReporter: {
      type: "text"
    },
    karmaTypescriptConfig: {
      bundlerOptions: {
        transforms: [require("karma-typescript-es6-transform")()]
      },
      reports: changeDebugOpts.reports,
      coverageOptions: {
        instrumentation: changeDebugOpts.instrumentation
      }
    }
  })
}

//
// module: {
//   rules: [
//     {
//       test: /\.css$/,
//       use: [ "style-loader", "css-loader" ],
//       exclude: /node_modules/
//     },
//     {
//       test: /\.tsx?$/,
//       use: "ts-loader",
//       exclude: /node_modules/
//     }
//   ]
// },
// resolve: {
//   extensions: [ ".ts", ".js" ]
// }

// browsers: ["Chrome"],
// browsers: ["PhantomJS"],

/*
plugins : [
  "karma-webpack-with-fast-source-maps",
  "karma-sourcemap-loader",
  "karma-jasmine",
  "karma-chrome-launcher",
  "karma-coverage"
],*/

// webpack : {
//   module: webpackConfig.module,
//     resolve: webpackConfig.resolve,
//     entry: webpackConfig.entry
// },
