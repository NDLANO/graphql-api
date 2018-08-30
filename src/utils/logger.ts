/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import bunyan, { default as Logger, LogLevelString } from 'bunyan';
import 'source-map-support/register';

interface INdlaLogger extends Logger {
  logAndReturnValue(level: LogLevelString, msg: string, value: any): any;
}

let log = bunyan.createLogger({ name: 'ndla-graphql-api' }) as INdlaLogger;

log.logAndReturnValue = (level, msg, value) => {
  log[level](msg, value);
  return value;
};

export default log;
