//command to run
const args = [ 'start' ];
// options for .spawn | cwd = current working directory
const opts = { stdio: 'inherit', cwd: 'client', shell: true };
require('child_process').spawn('npm', args, opts);
