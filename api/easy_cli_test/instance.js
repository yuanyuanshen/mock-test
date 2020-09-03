import { createAPI } from '../util';
import config from '../config';

const baseUrl = {
  mock: 'http://easy-mock.jd.com/mock/5ddba6ead8dabc00913ae0c3/easy_cli_test',
  dev: '',
  pre: '',
  prod: ''
}[config.env || 'mock'];

export default createAPI(baseUrl);
