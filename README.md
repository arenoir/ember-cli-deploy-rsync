# Ember-cli-deploy-rsync

Deploy ember-cli applications using rsync over ssh.

+[![](https://ember-cli-deploy.github.io/ember-cli-deploy-version-badges/plugins/ember-cli-deploy-rsync.svg)](http://ember-cli-deploy.github.io/ember-cli-deploy-version-badges/)

## Installation

* `npm install --save-dev ember-cli-deploy-rsync`

## Configuration

- `dest`: Rsync destination `/folder/`
- `host`: Rsync host `user@my.cdn.com`
- `ssh`: Rsync over ssh (default: true)
- `recursive`: Recurse into subdirectories (default: true).
- `delete`: Delete files at destination, that are not in src (default: false).
- `deleteAll`: Like delete, but also delete excluded files, see rsync manpage (default: false).
- `port`: Rsync ssh port.
- `privateKey`: location of private key file to use for SSH connection
- `args`: array of rsync args


Example `config/deploy.js` to deploy with production and staging environments


// deploy.js (sync)
module.exports = function(environment){
    var ENV = {
    };

    if (environment === 'production') {
        ENV.rsync = {
            type: 'rsync',
            dest: "/var/www/app",
            host: "production.company.com",
            ssh: true,
            recursive: true,
            delete: true,
            args: ["--verbose", "--rsync-path='sudo -u www-data rsync'", "-ztl"]
        }
    }

    if (environment === 'stage') {
        ENV.rsync = {
            type: 'rsync',
            dest: "/var/www/app",
            host: "stage.company.com",
            ssh: true,
            recursive: true,
            delete: true,
            args: ["--verbose", "-ztl"]
        }
    }

    return ENV;
};

