import instance from './instance';
import { convertRESTAPI } from '../util';

/** 测试代理 */
function proxy_get(opts) {
  return instance({
    method: 'get',
    url:  '/proxy',
    opts: opts
  });
}

/** 支持 restful 的 mock，替换 id 试试 */
function restful_id_list_get(opts) {
  return instance({
    method: 'get',
    url: convertRESTAPI('/restful/:id/list', opts),
    opts: opts
  });
}

/** 登录 */
function login_post(opts) {
  return instance({
    method: 'post',
    url:  '/login',
    opts: opts
  });
}

/** 带随机数据的 mock */
function mocktest_get(opts) {
  return instance({
    method: 'get',
    url:  '/mocktest',
    opts: opts
  });
}

export {
  proxy_get,
  restful_id_list_get,
  login_post,
  mocktest_get
};
