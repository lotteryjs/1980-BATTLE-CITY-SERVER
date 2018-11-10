import config from '../config';
import app from './app';

const start = () => {
  const execSync = require('child_process').execSync;
  const port = config.serve.port;
  const url = `http://localhost:${port}`; // /api.html
  const open = true;
  // tslint:disable-next-line:no-console
  console.log('----------------------------------------');
  app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`battle-city-server is running as ${url}`);
    if (!open) return;
    try {
      execSync(`osascript openChrome.applescript ${url}`, { cwd: __dirname, stdio: 'ignore' });
    } catch (e) {
      execSync(`open ${url}`);
    }
  });
};

start();
export {};
