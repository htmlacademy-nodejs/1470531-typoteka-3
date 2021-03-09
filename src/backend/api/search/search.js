'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../../constants`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/search`, route);

  route.get(`/`, async (req, res) => {
    const {query = ``} = req.query;

    if (!query) {
      res.status(HttpCode.OK).json([]);
      return;
    }

    const searchResults = await service.findAll(query);

    res.status(HttpCode.OK).json(searchResults);
  });
};
