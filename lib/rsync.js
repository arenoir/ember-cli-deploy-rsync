/* jshint node: true */
'use strict';

var CoreObject   = require('core-object');
var Promise      = require('ember-cli/lib/ext/promise');
var SilentError  = require('ember-cli/lib/errors/silent');
var Rsync        = require("rsyncwrapper").rsync;

module.exports = CoreObject.extend({
  init: function() {
    CoreObject.prototype.init.apply(this, arguments);

    if (!this.config) {
      return Promise.reject(new SilentError('You have to pass a config!'));
    }    
  },

  upload: function() {
    var config  = this.config.assets;
    var options = {
      src: "tmp/assets-sync/",
      dest: config.dest,
      ssh: config.ssh,
      port: config.port,
      privateKey: config.privateKey,
      args: config.args
    }

    return new Promise(function(resolve, reject) {
      Rsync(options, function (error, stdout, stderr, cmd)  {  
        if (error) {
          reject(new SilentError('Unable to sync: ' + error));
        } else {
          resolve();
        }
      });
    });
  }
});
