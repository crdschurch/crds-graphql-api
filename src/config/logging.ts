import express from 'express';
import newrelic from 'newrelic';

let logger = require('logzio-nodejs').createLogger({
    token: process.env.LOGZ_IO_KEY,
    timeout: 1000
});

const Application = 'graphql-api';

export function logError(err) {

    var log = {
        application: Application,
        environment: process.env.CRDS_ENV,
        level: 'error',
        message: err && err.originalError && err.originalError.response && err.originalError.response.data.Message || err.message,
        request: err.source && err.source.body
    };

    logger.log(log);
    newrelic.noticeError("errorMessage", log);
}

export function logResponseBody(res) {

    if(res && res.data.__schema) return;
    var log = {
        application: Application,
        environment: process.env.CRDS_ENV,
        level: 'info',
        message: JSON.stringify(res.data),
    };

    logger.log(log);
}
