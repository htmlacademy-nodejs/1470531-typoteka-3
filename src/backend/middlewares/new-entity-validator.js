'use strict';

const {HttpCode} = require(`../../constants`);

const newEntityValidator = (schema) => async (req, res, next) => {
  const {body} = req;

  try {
    await schema.validateAsync(body, {abortEarly: false});
  } catch (err) {
    const {details} = err;

    res.status(HttpCode.BAD_REQUEST).json({
      message: details.map((errorDescription) => errorDescription.message),
      data: body,
    });

    return;
  }

  next();
};

module.exports = newEntityValidator;
