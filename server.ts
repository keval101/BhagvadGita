import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'fs';
import { join, resolve } from 'path';
import { AppServerModule } from './src/main.server';
import { SSR_RESPONSE } from './src/app/seo/ssr-tokens';

export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/BhagvadGita/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  const resolvedDist = resolve(distFolder);

  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.use((req, res, next) => {
    if (req.path.length > 1 && req.path.endsWith('/')) {
      const query = req.url.slice(req.path.length);
      return res.redirect(301, req.path.slice(0, -1) + query);
    }
    next();
  });

  server.get('/home', (req, res) => {
    res.redirect(301, '/');
  });

  server.get('*.*', (req, res) => {
    const requested = resolve(distFolder, decodeURIComponent(req.path).replace(/^\/+/, ''));
    if (!requested.startsWith(resolvedDist + '/') && requested !== resolvedDist) {
      return res.status(400).type('text/plain').send('Bad request');
    }
    if (existsSync(requested)) {
      return res.sendFile(requested, { maxAge: '1y' });
    }
    return res.status(404).type('text/plain').send('Not found');
  });

  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      res,
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: SSR_RESPONSE, useValue: res }
      ]
    }, (err, html) => {
      if (err) {
        res.status(500).type('text/plain').send('Server error');
        return;
      }
      if (res.statusCode === 404) {
        res.setHeader('Cache-Control', 'private, no-store, must-revalidate');
      } else {
        res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      }
      res.send(html);
    });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
