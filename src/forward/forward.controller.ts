import { All, BadRequestException, Controller, Next, Query, Req, Res } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Public } from 'src/auth/jwt-auth.guard';

const proxy = createProxyMiddleware<any, Response>({
  router: target => {
    return target.query.url;
  },
  changeOrigin: true,
  ignorePath: true,
});
@Controller('forward')
export class ForwardController {
  @Public()
  @All()
  async get(
    @Query() query: Record<string, string>,
    @Req() req: any,
    @Res() res: Response,
    @Next() next
  ) {
    console.log('query', query);
    if (query?.url) {
      await proxy(req, res, next);
      return res;
    }
    throw new BadRequestException('not found');
  }
}
