const logger = require('../logger/logger');

const loggerReq = async (req, res, next) => {
    if (req.userId !== undefined) {
        logger.info(`Request UserId :  ${req.userId} `);
    }
    if (Object.keys(req.params).length !== 0)
        logger.info(`Req params :  ${JSON.stringify(req.params)}`);
    if (Object.keys(req.query).length !== 0)
        logger.info(`Req Query : ${JSON.stringify(req.query)}`);
    next();
}

module.exports = loggerReq;