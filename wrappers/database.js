const mongoose = require('mongoose');

//  Uris for production and test environment
//  Usar variables de ambiente es mas seguro
const PRODUCTION_URI = process.env.PRODUCTION_URI || 'mongodb://127.0.0.1:27017/production';
const TEST_URI = process.env.TEST_URI || 'mongodb://127.0.0.1:27017/test';

//  Variable that holds the state of the database
const state = {
  'db':  null,
  'uri': null
};

//  Get the environment Test or Production from a environment variable
const env = process.env.ENV;

exports.ENV_TEST = 'env_test';
exports.ENV_PRODUCTION = 'env_production';

//  Connect to the database
module.exports.connect = function () {
  if (state.db) {
    return;
  }

  state.uri = env === this.ENV_TEST ? TEST_URI : PRODUCTION_URI;
  mongoose.Promise = global.Promise;
  //  Database connection
  state.db = mongoose.connect(state.uri);
  //  On connection
  mongoose.connection.on('connected', () => {
    console.log('youre now connected to the database ' + state.uri);
  });
  //  On Error
  mongoose.connection.on('error', console.log);
};

//  Delete database
module.exports.drop = function () {
  return new Promise((resolve, reject) => {
    if (state.db) {
      state.db.connection.db.dropDatabase();
      return resolve();
    }
    reject();
  });
};
