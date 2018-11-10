import * as Router from 'koa-router';
const router = new Router();

// index
router.get('/', (ctx) => {
  ctx.body = 'Hello Battle!';
});

export default router;