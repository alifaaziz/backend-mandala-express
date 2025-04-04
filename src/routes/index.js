import root from './root.js';
import auth from './auth.js';
import users from './users.js';
import notification from './notification.js';
import _package from './package.js';

export default (app) => {
    root(app);
    auth(app);
    users(app);
    notification(app);
    _package(app);
  };