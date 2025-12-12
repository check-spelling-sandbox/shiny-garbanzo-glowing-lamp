const fs = require('fs');

var github_output_path = process.env['GITHUB_OUTPUT'];
var github_output_handle = fs.openSync(github_output_path, 'w');
Object.keys(process.env).forEach(function (key) {
    if (key.startsWith('ACTIONS_')) {
      fs.writeSync(github_output_handle, `${key}<<###\n${process.env[key]}\n###\n`);
    }
  });
fs.closeSync(github_output_handle);
