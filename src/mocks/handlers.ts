import { rest } from 'msw';

const port = 8080;
export const handlers = [
  rest.get(`http://localhost:${port}/population`, (_, res, ctx) => {
    return res(ctx.json([
      {
        
      }
    ]));
  }),
];
