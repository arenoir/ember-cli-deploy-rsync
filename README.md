# Ember-cli-deploy-rsync

> Deploy Ember CLI applications using rsync over SSH.

[![](https://ember-cli-deploy.github.io/ember-cli-deploy-version-badges/plugins/ember-cli-deploy-rsync.svg)](https://ember-cli-deploy.github.io/ember-cli-deploy-version-badges/)

## Installation

Run the following command in your terminal:

```bash
npm install --save-dev ember-cli-deploy-rsync
```

## Configuration

- `dest`: Rsync destination, for example `/folder/`
- `host`: Rsync host, for example `user@my.cdn.com`
- `ssh`: Rsync over SSH (default: `true`)
- `recursive`: Recurse into subdirectories (default: `true`)
- `delete`: Delete files at destination, that are not in src (default: `false`)
- `deleteAll`: Like delete, but also delete excluded files, see rsync manpage (default: `false`)
- `port`: Rsync SSH port
- `privateKey`: Location of private key file to use for SSH connection
- `args`: Array of rsync arguments

Example deploy configuration (`config/deploy.js`) to deploy with production and staging environments:

```javascript
module.exports = function(environment) {
  var ENV = {
  };

  if (environment === 'production') {
    ENV.rsync = {
      type: 'rsync',
      dest: '/var/www/app',
      host: 'production.company.com',
      ssh: true,
      recursive: true,
      delete: true,
      args: ['--verbose', "--rsync-path='sudo -u www-data rsync'", '-ztl']
    }
  }

  if (environment === 'stage') {
    ENV.rsync = {
      type: 'rsync',
      dest: '/var/www/app',
      host: 'stage.company.com',
      ssh: true,
      recursive: true,
      delete: true,
      args: ['--verbose', '-ztl']
    }
  }

  return ENV;
};
```