'use strict';

module.exports = [
  {method: 'get', path: '/{param*}', config: require('../routes/general/static')},

  {method: 'get', path: '/status', config: require('../routes/users/status')},
  {method: 'delete', path: '/logout', config: require('../routes/users/logout')},

  {method: 'post', path: '/auth/login', config: require('../routes/users/login')},
  {method: 'post', path: '/auth/signup', config: require('../routes/users/register')},
  {method: 'post', path: '/auth/github', config: require('../routes/users/github')},
  {method: 'post', path: '/auth/linkedin', config: require('../routes/users/linkedin')},
  {method: 'post', path: '/auth/facebook', config: require('../routes/users/facebook')}
];
