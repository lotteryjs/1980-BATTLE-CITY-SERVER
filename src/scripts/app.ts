import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as serve from 'koa-static';
import * as cors from 'kcors';
import router from '../routes';

const app = new Koa();

if (process.env.NODE_ENV === 'development' && process.env.TEST_MODE !== 'true') app.use(logger());

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  ctx.set('Access-Control-Allow-Credentials', 'true');
  await next();
  if (ctx.path === '/favicon.ico') return;
});

app.use(cors({
  credentials: true,
}));

app.use(serve('public'));

app.use(router.routes());

export default app;
