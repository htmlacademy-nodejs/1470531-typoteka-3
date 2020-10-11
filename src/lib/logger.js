'use strict';

const fs = require(`fs`);
const path = require(`path`);
const pinoms = require(`pino-multi-stream`);
const {logLevel} = require(`src/backend/configs/env-config`);

const prettyStream = pinoms.prettyStream({
  prettyPrint: {
    colorize: true,
    translateTime: `SYS:standard`,
    ignore: `hostname,pid`
  },
  prettifier: require(`pino-pretty`)
});
const level = logLevel || `info`;
const streams = [
  {level, stream: fs.createWriteStream(path.join(path.dirname(process.mainModule.path), `service`, `logs`, `logs.txt`))},
  {level, stream: prettyStream}
];

const logger = pinoms({
  name: `pino-and-express`,
  level,
}, pinoms.multistream(streams));

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
