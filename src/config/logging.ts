import express from 'express';
import newrelic from 'newrelic';
import { injectable } from 'inversify';

@injectable()
export class Logger {
    private application: string = 'graphql-api';
    public client;

    constructor() {
        this.client = require('logzio-nodejs').createLogger({
            token: process.env.LOGZIO_API_TOKEN,
            timeout: 1000
        });
    }

    public logError(err): void {
        const log = {
            application: this.application,
            environment: process.env.CRDS_ENV,
            level: 'error',
            message: err && err.originalError && err.originalError.response && err.originalError.response.data.Message || err.message,
            request: err.source && err.source.body
        };

        this.client.log(log);
        newrelic.noticeError("errorMessage", log);
    }

    public logResponseBody(res): void {
        if (res && res.data.__schema) return;
        var log = {
            application: this.application,
            environment: process.env.CRDS_ENV,
            level: 'info',
            message: JSON.stringify(res.data),
        };

        this.client.log(log);
    }
}
