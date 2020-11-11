const boom = require('@hapi/boom');
/*eslint-disable */
const joi = require('@hapi/joi');
/*eslint-enable */

const validate = (data, schema) => {
    const { error } = schema.validate(data, { errors: { stack: true } });
    return error;
}

const validationHandler = (schema, check = 'body') => {
    return (request, response, next) => {
        const error = validate(request[check], schema);
        error ? next(boom.badRequest(error)) : next();
    };
}


module.exports = validationHandler;