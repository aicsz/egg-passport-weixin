"use strict";
const WeixinStrategy = require("passport-weixin");

module.exports = app => {
  const config = app.config.passportAsiczWeixin;

  // 扫码登录
  // 微信官网文档：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419316505&token=&lang=zh_CN
  app.passport.use(
    "loginByWeixin",
    new WeixinStrategy(
      {
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackURL,
        requireState: false,
        scope: "snsapi_login"
      },
      (req, accessToken, refreshToken, profile, done) => {
        app.logger.info(profile);
        const user = {
          provider: "weixin",
          id: profile.id,
          displayName: profile.displayName,
          photo: profile.profileUrl,
          emails: profile.emails,
          accessToken,
          refreshToken
        };
        app.passport.doVerify(req, user, done);
      }
    )
  );

  // 微信客户端登录
  // 微信官网文档：http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html
  app.passport.use(
    "loginByWeixinClient",
    new WeixinStrategy(
      {
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackURL,
        requireState: false,
        authorizationURL: "https://open.weixin.qq.com/connect/oauth2/authorize", // [公众平台-网页授权获取用户基本信息]的授权URL 不同于[开放平台-网站应用微信登录]的授权URL
        scope: "snsapi_userinfo" // [公众平台-网页授权获取用户基本信息]的应用授权作用域 不同于[开放平台-网站应用微信登录]的授权URL
      },
      (req, accessToken, refreshToken, profile, done) => {
        app.logger.info(profile);
        const user = {
          provider: "weixin",
          id: profile.id,
          displayName: profile.displayName,
          photo: profile.profileUrl,
          emails: profile.emails,
          accessToken,
          refreshToken
        };
        app.passport.doVerify(req, user, done);
      }
    )
  );
};
