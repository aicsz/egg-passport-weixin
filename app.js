"use strict";
const weixinStrategy = require("passport-weixin");

module.exports = app => {
  var config = app.config.passportWeiXin;
  config.passReqToCallback = true;
  config.clientSecret = config.secret;
  var client = "snsapi_login";
  if (config.scope == "snsapi_userinfo") {
    config.authorizationURL =
      "https://open.weixin.qq.com/connect/oauth2/authorize";
    client = "loginByWeixinClient";
  }

  config.requireState = false;
  app.logger.info(config);
  app.passport.use(
    client,
    new weixinStrategy(
      config,
      (req, accessToken, refreshToken, profile, done) => {
        const user = {
          provider: "weixin",
          id: profile.id,
          displayName: profile.displayName,
          photo: profile.profileUrl,
          emails: profile.emails,
          accessToken: accessToken,
          refreshToken: refreshToken
        };

        //debug('%s %s get user: %j', req.method, req.url, user);
        //app.logger.info(user);
        app.passport.doVerify(req, user, done);
      }
    )
  );
};
