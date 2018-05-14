'use strict';

const mock = require('egg-mock');

describe('test/passport-asicz-weixin.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/passport-asicz-weixin-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, passportAsiczWeixin')
      .expect(200);
  });
});
