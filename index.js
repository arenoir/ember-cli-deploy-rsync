/* jshint node: true */
'use strict';

var BasePlugin = require('ember-cli-deploy-plugin');
var Promise = require('ember-cli/lib/ext/promise');
var SilentError = require('silent-error');
var Rsync = require('rsyncwrapper').rsync;

module.exports = {
    name: 'ember-cli-deploy-rsync',

    createDeployPlugin: function(options) {
        var DeployPlugin = BasePlugin.extend({
            name: options.name,

            defaultConfig: {
                args: [],
                delete: false,
                deleteAll: false,
                recursive: true
            },

            requiredConfig: ['dest'],

            didBuild: function(context) {
                // Do something amazing here once the project has been built
            },

            upload: function(context) {
                this.log('Uploading using rsync...');
                var options = {
                    src: context.distDir + '/',
                    dest: this.readConfig('dest'),
                    host: this.readConfig('host'),
                    ssh: this.readConfig('ssh'),
                    port: this.readConfig('port'),
                    privateKey: this.readConfig('privateKey'),
                    recursive: this.readConfig('recursive'),
                    delete: this.readConfig('delete'),
                    deleteAll: this.readConfig('deleteAll'),
                    args: this.readConfig('args')
                };

                var that = this;
                return new Promise(function(resolve, reject) {
                    Rsync(options, function (error, stdout, stderr, cmd)  {
                        if (error) {
                            that.log(stdout);
                            that.log(stderr);
                            reject(new SilentError('Unable to sync!'));
                        } else {
                            that.log(stdout);
                            resolve();
                        }
                    });
                });
            },

            didDeploy: function(context) {
                // Do something here like notify your team on slack
            }
        });

        return new DeployPlugin();
    }
}
