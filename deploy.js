const Rsync = require('rsync');
const serverSettings = require('./src/environments/private/serverSettings');
 
const rsync = new Rsync()
  .shell('ssh')
  .flags('az')
  .set('delete')
  .source('./dist/nemocnice/')
  .source('./docs/')
  .exclude('.htaccess')
  .destination(serverSettings.destination);
 
rsync.execute(function(error, code, cmd) {});