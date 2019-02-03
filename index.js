var fs = require('fs');
var path = require('path');
var os = require('os');
var spawnSync = require('child_process').spawnSync;
var spawn = require('child_process').spawn;

var SafariBrowserNative = function(baseBrowserDecorator, logger) {
  baseBrowserDecorator(this);
  var log = logger.create('launcher');

  this._start = function(url) {
    var self = this;

    var safariUrlLauncher = path.normalize(__dirname + '/SafariURLLauncher');
    self._execCommand(self._getCommand(), []);
    //Use launch services to open url in Safari.
    let urlLauncher = spawnSync(safariUrlLauncher, [url], {"cwd": os.tmpdir(), "encoding": "utf8"});

    log.info("Output Array from SafariURLLauncher: ", urlLauncher.output);
    log.info("Stdout from SafariURLLauncher: ", urlLauncher.stdout);

    var baseOnProcessExit = this._onProcessExit
    this._onProcessExit = function (code, errorOutput) {

        var killSafari = spawn("killall", ["Safari"]);

        killSafari.stdout.on('data', self._onStdout)

        killSafari.stderr.on('data', self._onStderr)

        killSafari.on('error', self._onStderr)

        killSafari.on('exit', function (code) {
          baseOnProcessExit(code, errorOutput)
        });

    }
  };
};

SafariBrowserNative.prototype = {
  name: 'SafariNative',

  DEFAULT_CMD: {
    darwin: '/Applications/Safari.app/Contents/MacOS/Safari',
    win32: process.env['ProgramFiles(x86)'] + '\\Safari\\Safari.exe'
  },
  ENV_CMD: 'SAFARI_NATIVE_BIN'
};

SafariBrowserNative.$inject = ['baseBrowserDecorator', 'logger'];

// PUBLISH DI MODULE
module.exports = {
  'launcher:SafariNative': ['type', SafariBrowserNative]
};
