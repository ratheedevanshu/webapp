module.exports.sendResponse = function sendResponse(res, code, successFlag, msg, data, err) {
    const responseData = {
        meta: {
            code: code,
            success: successFlag,
            message: msg
        },
        data,
        error: err
    }
    return res.status(code).json(responseData);
}