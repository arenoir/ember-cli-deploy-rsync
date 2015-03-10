# Ember-cli-deploy-rsync

Deploy ember-cli applications using rsync over ssh.

## Installation

* `npm install --save-dev ember-cli-deploy-rsync`

## Configuration

- `dest`: Rsync destination `user@my.cdn.com:/folder/`
- `ssh`: Rsync over ssh.
- `port`: Rsync ssh port.
- `privateKey`: location of private key file to use for SSH connection
- `args`: array of rsync args


Example `config/deploy.js` to deploy to keycdn because cloudfront ssl is too expensive.

```
/* jshint node: true */

module.exports = {
  production: {
    assets: {
      type: 'rsync',
      dest: "user@rsync.keycdn.com:zones/myzone/",
      ssh: true,
      port: 22,
      privateKey: '~/.ssh/cdn-deployer',
      args: ['-avz', '--no-p']
    }
  }
};
```
