'use strict';

const bodyParser = require(`body-parser`);
const path = require(`path`);
const helmet = require(`helmet`);
const expressSession = require(`express-session`);
const {express, app, server} = require(`./server`);
const {DEFAULT_FRONT_PORT, PUBLIC_DIR, TEMPLATES_DIR, Message} = require(`../constants`);
const mainRoute = require(`./routes/main-route`);
const registerRoutes = require(`./routes/register-routes`);
const loginRoutes = require(`./routes/login-routes`);
const searchRoutes = require(`./routes/search-routes`);
const categoriesRoutes = require(`./routes/categories-routes`);
const myRoutes = require(`./routes/my-routes`);
const articlesRoutes = require(`./routes/articles-routes`);
const logoutRoutes = require(`./routes/logout-routes`);
const errorsRoutes = require(`./routes/errors-routes`);
const {getLogger} = require(`../libs/logger`);
const {sessionStore} = require(`../configs/db-config`);
const {secret} = require(`../configs/env-config`);

const logger = getLogger();

app.set(`views`, path.resolve(__dirname, TEMPLATES_DIR));
app.set(`view engine`, `pug`);

app.use(helmet());

app.use(
    expressSession({
      secret,
      resave: false,
      store: sessionStore,
      proxy: true,
      saveUninitialized: false,
    })
);

sessionStore.sync();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.use(`/`, mainRoute);
app.use(`/register`, registerRoutes);
app.use(`/login`, loginRoutes);
app.use(`/logout`, logoutRoutes);
app.use(`/search`, searchRoutes);
app.use(`/categories`, categoriesRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);
app.use(`/errors`, errorsRoutes);

server.listen(DEFAULT_FRONT_PORT, (err) => {
  if (err) {
    logger.error(Message.serverStartError(DEFAULT_FRONT_PORT, err));
  }

  logger.info(Message.listenOnPort(DEFAULT_FRONT_PORT));
});
