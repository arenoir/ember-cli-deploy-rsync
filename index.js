/* jshint node: true */
'use strict';

var rsyncAdapter = require('./lib/rsync');

module.exports = {
  name: 'ember-cli-deploy-rsync',
  type: 'ember-deploy-addon',
  adapters: {
    assets: {
      'rsync': rsyncAdapter
    }
  }
}