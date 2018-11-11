import { createServer } from 'http';
import { Server } from 'colyseus';
import config from '../config';
import app from './app';
import { TestRoom } from '../battle/testroom';

const start = () => {
  const execSync = require('child_process').execSync;
  const port = config.serve.port;
  const url = `http://localhost:${port}`; // /api.html
  const open = true;
  // tslint:disable-next-line:no-console
  console.log('----------------------------------------');
  // Attach WebSocket Server on HTTP Server.
  const gameServer = new Server({
    server: createServer(app.callback()),
  });

  // Register ChatRoom as "test"
  gameServer.register('test', TestRoom);

  gameServer.onShutdown(() => {
    // tslint:disable-next-line:no-console
    console.log(`game server is going down.`);
  });

  gameServer.listen(port, 'localhost', 0, () => {
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
