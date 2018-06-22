// Initializes and executes the middleware only if the request is not
// a cron execution
module.exports = (middlewareInit) => {
  let middleware;
  return (req, res, next) => {
    const wtBody = (req.webtaskContext && req.webtaskContext.body) || req.body || {};
    const wtHead = (req.webtaskContext && req.webtaskContext.headers) || {};
    const isCron = (wtBody.schedule && wtBody.state === 'active') || (wtHead.referer === 'https://manage.auth0.com/' && wtHead['if-none-match']);

    if (isCron) {
      return next();
    }

    middleware = middleware || middlewareInit();
    middleware(req, res, next);
  };
};