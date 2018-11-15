import { createServer } from 'http';
import { Server } from 'colyseus';
import config from '../config';
import app from './app';
import { BattleRoom } from '../battle/room';

const start = () => {
  const execSync = require('child_process').execSync;
  const port = config.serve.port;
  const url = `http://localhost:${port}`; // /api.html
  const open = false;
  // tslint:disable-next-line:no-console
  console.log('----------------------------------------');
  const server = createServer(app.callback());
  // Attach WebSocket Server on HTTP Server.
  const gameServer = new Server({
    server,
  });

  // Register ChatRoom as "test"
  gameServer.register('battle', BattleRoom);

  gameServer.onShutdown(() => {
    console.log(`game server is going down.`);
  });
  // gameServer.listen(port);
  gameServer.listen(port, '', 0, () => {
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
