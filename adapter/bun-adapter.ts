import * as http from "http";
import * as https from "https";
import { AbstractHttpAdapter } from "@nestjs/core/adapters/http-adapter";
import { RequestMethod, VersioningOptions } from "@nestjs/common";
import { VersionValue } from "@nestjs/common/interfaces";
import { NestApplicationOptions } from "@nestjs/common/interfaces/nest-application-options.interface";

export class BunAdapter extends AbstractHttpAdapter<
  http.Server | https.Server
> {
  private server?: Bun.Server;
  private routes: Map<string, Function> = new Map();

  constructor(instance?: any) {
    // Create an Express-like instance if none provided
    if (!instance) {
      const expressLike = {
        use: (path: string | Function, handler?: Function) => {
          // Will be bound later
          return expressLike;
        },
        get: (path: string | Function, handler?: Function) => {
          // Will be bound later
          return expressLike;
        },
        post: (path: string | Function, handler?: Function) => {
          // Will be bound later
          return expressLike;
        },
        put: (path: string | Function, handler?: Function) => {
          // Will be bound later
          return expressLike;
        },
        patch: (path: string | Function, handler?: Function) => {
          // Will be bound later
          return expressLike;
        },
        delete: (path: string | Function, handler?: Function) => {
          // Will be bound later
          return expressLike;
        },
        head: (path: string | Function, handler?: Function) => {
          // Will be bound later
          return expressLike;
        },
        options: (path: string | Function, handler?: Function) => {
          // Will be bound later
          return expressLike;
        },
        all: (path: string | Function, handler?: Function) => {
          // Will be bound later
          return expressLike;
        }
      };
      super(expressLike);
      
      // Now bind the methods after super is called
      expressLike.use = (path: string | Function, handler?: Function) => {
        if (typeof path === 'function') {
          return this.use(path);
        }
        return this.use(path, handler);
      };
      expressLike.get = (path: string | Function, handler?: Function) => {
        if (typeof path === 'function') {
          return this.get(path);
        }
        return this.get(path, handler!);
      };
      expressLike.post = (path: string | Function, handler?: Function) => {
        if (typeof path === 'function') {
          return this.post(path);
        }
        return this.post(path, handler!);
      };
      expressLike.put = (path: string | Function, handler?: Function) => {
        if (typeof path === 'function') {
          return this.put(path);
        }
        return this.put(path, handler!);
      };
      expressLike.patch = (path: string | Function, handler?: Function) => {
        if (typeof path === 'function') {
          return this.patch(path);
        }
        return this.patch(path, handler!);
      };
      expressLike.delete = (path: string | Function, handler?: Function) => {
        if (typeof path === 'function') {
          return this.delete(path);
        }
        return this.delete(path, handler!);
      };
      expressLike.head = (path: string | Function, handler?: Function) => {
        if (typeof path === 'function') {
          return this.head(path);
        }
        return this.head(path, handler!);
      };
      expressLike.options = (path: string | Function, handler?: Function) => {
        if (typeof path === 'function') {
          return this.options(path);
        }
        return this.options(path, handler!);
      };
      expressLike.all = (path: string | Function, handler?: Function) => {
        if (typeof path === 'function') {
          return this.all(path);
        }
        return this.all(path, handler!);
      };
    } else {
      super(instance);
    }
  }

  // Override HTTP methods to store routes
  public get(path: string, handler: Function): any;
  public get(handler: Function): any;
  public get(pathOrHandler: string | Function, handler?: Function): any {
    if (typeof pathOrHandler === 'string') {
      console.log('Registering GET route:', pathOrHandler);
      this.routes.set(`GET:${pathOrHandler}`, handler!);
    } else {
      console.log('Registering GET middleware');
      this.routes.set(`GET:*`, pathOrHandler);
    }
    return this;
  }

  public post(path: string, handler: Function): any;
  public post(handler: Function): any;
  public post(pathOrHandler: string | Function, handler?: Function): any {
    if (typeof pathOrHandler === 'string') {
      this.routes.set(`POST:${pathOrHandler}`, handler!);
    } else {
      this.routes.set(`POST:*`, pathOrHandler);
    }
    return this;
  }

  public put(path: string, handler: Function): any;
  public put(handler: Function): any;
  public put(pathOrHandler: string | Function, handler?: Function): any {
    if (typeof pathOrHandler === 'string') {
      this.routes.set(`PUT:${pathOrHandler}`, handler!);
    } else {
      this.routes.set(`PUT:*`, pathOrHandler);
    }
    return this;
  }

  public patch(path: string, handler: Function): any;
  public patch(handler: Function): any;
  public patch(pathOrHandler: string | Function, handler?: Function): any {
    if (typeof pathOrHandler === 'string') {
      this.routes.set(`PATCH:${pathOrHandler}`, handler!);
    } else {
      this.routes.set(`PATCH:*`, pathOrHandler);
    }
    return this;
  }

  public delete(path: string, handler: Function): any;
  public delete(handler: Function): any;
  public delete(pathOrHandler: string | Function, handler?: Function): any {
    if (typeof pathOrHandler === 'string') {
      this.routes.set(`DELETE:${pathOrHandler}`, handler!);
    } else {
      this.routes.set(`DELETE:*`, pathOrHandler);
    }
    return this;
  }

  public head(path: string, handler: Function): any;
  public head(handler: Function): any;
  public head(pathOrHandler: string | Function, handler?: Function): any {
    if (typeof pathOrHandler === 'string') {
      this.routes.set(`HEAD:${pathOrHandler}`, handler!);
    } else {
      this.routes.set(`HEAD:*`, pathOrHandler);
    }
    return this;
  }

  public options(path: string, handler: Function): any;
  public options(handler: Function): any;
  public options(pathOrHandler: string | Function, handler?: Function): any {
    if (typeof pathOrHandler === 'string') {
      this.routes.set(`OPTIONS:${pathOrHandler}`, handler!);
    } else {
      this.routes.set(`OPTIONS:*`, pathOrHandler);
    }
    return this;
  }

  public all(path: string, handler: Function): any;
  public all(handler: Function): any;
  public all(pathOrHandler: string | Function, handler?: Function): any {
    if (typeof pathOrHandler === 'string') {
      this.routes.set(`ALL:${pathOrHandler}`, handler!);
    } else {
      this.routes.set(`ALL:*`, pathOrHandler);
    }
    return this;
  }

  public use(pathOrHandler: string | Function, handler?: Function): any {
    if (typeof pathOrHandler === 'string' && handler) {
      this.routes.set(`USE:${pathOrHandler}`, handler);
    } else if (typeof pathOrHandler === 'function') {
      this.routes.set(`USE:*`, pathOrHandler);
    }
    return this;
  }

  public async init() {
    // Initialize the adapter
  }

  public reply(response: any, body: any, statusCode?: number) {
    if (statusCode) {
      response.status = statusCode;
      response.statusCode = statusCode;
    }
    
    // Handle different response types
    if (body === null || body === undefined) {
      body = '';
    }

    // If response has a send method, use it
    if (response.send) {
      return response.send(body);
    }

    // If response has a json method and body is an object, use it
    if (response.json && typeof body === 'object' && body !== null) {
      return response.json(body);
    }

    // Fallback to creating a new Response
    if (typeof body === 'string') {
      return new Response(body, { 
        status: response.status || response.statusCode || 200,
        headers: response.headers || {}
      });
    }

    return new Response(JSON.stringify(body), {
      status: response.status || response.statusCode || 200,
      headers: {
        'Content-Type': 'application/json',
        ...(response.headers || {})
      }
    });
  }

  public status(response: any, statusCode: number) {
    response.status = statusCode;
    return response;
  }

  public end(response: any, message?: string) {
    return new Response(message || '', { 
      status: response.status || 200,
      headers: response.headers || {}
    });
  }

  public render(response: any, view: string, options: any) {
    // Template rendering would be implemented here
    throw new Error('Template rendering not yet implemented');
  }

  public redirect(response: any, statusCode: number, url: string) {
    return new Response(null, {
      status: statusCode,
      headers: {
        Location: url,
        ...(response.headers || {})
      }
    });
  }

  public setErrorHandler(handler: Function, prefix?: string) {
    // Error handling would be implemented here
    console.log('Error handler set');
  }

  public setNotFoundHandler(handler: Function, prefix?: string) {
    // Not found handling would be implemented here
    console.log('Not found handler set');
  }

  public isHeadersSent(response: any): boolean {
    // In Bun, headers are sent when Response is created
    return false;
  }

  public getHeader(response: any, name: string) {
    return response.headers?.[name];
  }

  public setHeader(response: any, name: string, value: string) {
    if (!response.headers) {
      response.headers = {};
    }
    response.headers[name] = value;
    return response;
  }

  public appendHeader(response: any, name: string, value: string) {
    if (!response.headers) {
      response.headers = {};
    }
    const existing = response.headers[name];
    if (existing) {
      response.headers[name] = Array.isArray(existing) 
        ? [...existing, value]
        : [existing, value];
    } else {
      response.headers[name] = value;
    }
    return response;
  }

  public registerParserMiddleware(prefix?: string, rawBody?: boolean) {
    // Body parsing middleware would be implemented here
    console.log('Parser middleware registered');
  }

  public enableCors(options?: any, prefix?: string) {
    // CORS would be implemented here
    console.log('CORS enabled');
  }

  public createMiddlewareFactory(requestMethod: RequestMethod) {
    return (path: string, callback: Function) => {
      const key = `${requestMethod}:${path}`;
      this.routes.set(key, callback);
    };
  }

  public getType(): string {
    return 'bun';
  }

  public applyVersionFilter(
    handler: Function,
    version: VersionValue,
    versioningOptions: VersioningOptions,
  ) {
    return (req: any, res: any, next: () => void) => {
      // Version filtering would be implemented here
      return handler(req, res, next);
    };
  }

  public close() {
    if (this.server) {
      this.server.stop();
    }
    return Promise.resolve();
  }

  public initHttpServer(options: NestApplicationOptions) {
    // Create a mock http server for NestJS compatibility
    const mockServer = new (require('events').EventEmitter)();
    mockServer.listen = () => {};
    mockServer.address = () => ({ port: 0 });
    mockServer.once = (event: string, callback: Function) => {};
    mockServer.removeListener = (event: string, callback: Function) => {};
    
    this.httpServer = mockServer as any;
    console.log('HTTP server initialized with options:', options);
  }

  public useStaticAssets(...args: any[]) {
    // Static assets handling would be implemented here
    console.log('Static assets configured');
  }

  public setViewEngine(engine: string) {
    // View engine configuration would be implemented here
    console.log('View engine set to:', engine);
  }

  public getRequestHostname(request: any): string {
    return request.headers?.host || 'localhost';
  }

  public getRequestMethod(request: any): string {
    return request.method;
  }

  public getRequestUrl(request: any): string {
    return request.url;
  }

  public listen(port: string | number, callback?: () => void);
  public listen(port: string | number, hostname: string, callback?: () => void);
  public listen(port: any, hostname?: any, callback?: any) {
    const actualCallback = typeof hostname === 'function' ? hostname : callback;
    const actualHostname = typeof hostname === 'string' ? hostname : '0.0.0.0';
    
    this.server = Bun.serve({
      port: Number(port),
      hostname: actualHostname,
      fetch: async (request) => {
        try {
          const method = request.method;
          const url = new URL(request.url);
          const path = url.pathname;
          
          // Create a request object that mimics Express/HTTP request
          const req = {
            method,
            url: request.url,
            originalUrl: request.url,
            path,
            headers: Object.fromEntries(request.headers.entries()),
            query: Object.fromEntries(url.searchParams.entries()),
            body: request.body,
            params: {},
            ip: request.headers.get('x-forwarded-for') || 'unknown',
            protocol: url.protocol.replace(':', ''),
            secure: url.protocol === 'https:',
            xhr: request.headers.get('x-requested-with') === 'XMLHttpRequest',
            // Add request body parsing for POST/PUT/PATCH
            get: (header: string) => request.headers.get(header),
            header: (header: string) => request.headers.get(header)
          };

          // Parse request body if it exists
          if (request.body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
            try {
              const contentType = request.headers.get('content-type');
              if (contentType?.includes('application/json')) {
                req.body = await request.json();
              } else if (contentType?.includes('application/x-www-form-urlencoded')) {
                req.body = await request.text();
              } else {
                req.body = await request.text();
              }
            } catch (error) {
              console.warn('Failed to parse request body:', error);
            }
          }

          // Create a response object
          const res = {
            status: 200,
            headers: {} as Record<string, string>,
            locals: {},
            headersSent: false,
            statusCode: 200,
            statusMessage: 'OK'
          };

          // If we have an instance (e.g., Express app), delegate to it
          if (this.instance && typeof this.instance === 'function') {
            return new Promise<Response>((resolve, reject) => {
              let responseEnded = false;
              
              // Mock Express response methods
              const mockRes = {
                ...res,
                status: (code: number) => {
                  res.statusCode = code;
                  return mockRes;
                },
                json: (data: any) => {
                  if (responseEnded) return mockRes;
                  responseEnded = true;
                  resolve(new Response(JSON.stringify(data), {
                    status: res.statusCode,
                    headers: {
                      'Content-Type': 'application/json',
                      ...res.headers
                    }
                  }));
                  return mockRes;
                },
                send: (data: any) => {
                  if (responseEnded) return mockRes;
                  responseEnded = true;
                  const body = typeof data === 'object' ? JSON.stringify(data) : String(data);
                  const headers = { ...res.headers };
                  if (typeof data === 'object' && !headers['Content-Type']) {
                    headers['Content-Type'] = 'application/json';
                  }
                  resolve(new Response(body, {
                    status: res.statusCode,
                    headers
                  }));
                  return mockRes;
                },
                end: (data?: string) => {
                  if (responseEnded) return mockRes;
                  responseEnded = true;
                  resolve(new Response(data || '', {
                    status: res.statusCode,
                    headers: res.headers
                  }));
                  return mockRes;
                },
                setHeader: (name: string, value: string) => {
                  res.headers[name] = value;
                  return mockRes;
                },
                getHeader: (name: string) => res.headers[name],
                redirect: (statusCode: number, url: string) => {
                  if (responseEnded) return mockRes;
                  responseEnded = true;
                  if (typeof statusCode === 'string') {
                    url = statusCode;
                    statusCode = 302;
                  }
                  resolve(new Response(null, {
                    status: statusCode,
                    headers: {
                      Location: url,
                      ...res.headers
                    }
                  }));
                  return mockRes;
                }
              };

              try {
                // Call the Express app with the request
                this.instance(req, mockRes);
                
                // Set a timeout to avoid hanging requests
                setTimeout(() => {
                  if (!responseEnded) {
                    responseEnded = true;
                    resolve(new Response('Request timeout', { status: 408 }));
                  }
                }, 30000);
              } catch (error) {
                if (!responseEnded) {
                  responseEnded = true;
                  console.error('Error in instance handler:', error);
                  resolve(new Response('Internal Server Error', { status: 500 }));
                }
              }
            });
          }

          // Fallback for direct route handling
          console.log('Available routes:', Array.from(this.routes.keys()));
          console.log('Requested route:', `${method}:${path}`);
          
          const key = `${method}:${path}`;
          const handler = this.routes.get(key);
          if (handler) {
            console.log('Handler found, executing...');
            try {
              // Create a proper response object that NestJS can work with
              let responseBody: any = null;
              let responseStatus = 200;
              let responseHeaders: Record<string, string> = {};
              let responseEnded = false;

              const mockRes = {
                status: (code: number) => {
                  responseStatus = code;
                  return mockRes;
                },
                json: (data: any) => {
                  if (responseEnded) return mockRes;
                  responseEnded = true;
                  responseBody = data;
                  responseHeaders['Content-Type'] = 'application/json';
                  return mockRes;
                },
                send: (data: any) => {
                  if (responseEnded) return mockRes;
                  responseEnded = true;
                  responseBody = data;
                  return mockRes;
                },
                end: (data?: string) => {
                  if (responseEnded) return mockRes;
                  responseEnded = true;
                  if (data) responseBody = data;
                  return mockRes;
                },
                setHeader: (name: string, value: string) => {
                  responseHeaders[name] = value;
                  return mockRes;
                },
                getHeader: (name: string) => responseHeaders[name],
                redirect: (statusCode: number, url: string) => {
                  if (responseEnded) return mockRes;
                  responseEnded = true;
                  if (typeof statusCode === 'string') {
                    url = statusCode;
                    statusCode = 302;
                  }
                  responseStatus = statusCode;
                  responseHeaders['Location'] = url;
                  return mockRes;
                }
              };

              const result = await handler(req, mockRes);
              console.log('Handler result:', result);
              console.log('Response body:', responseBody);
              console.log('Response status:', responseStatus);
              
              if (result instanceof Response) {
                return result;
              }
              
              // If we have a response body, use it
              if (responseBody !== null) {
                const body = typeof responseBody === 'string' 
                  ? responseBody 
                  : JSON.stringify(responseBody);
                return new Response(body, {
                  status: responseStatus,
                  headers: responseHeaders
                });
              }
              
              // If handler returned something directly, use that (typical for NestJS controllers)
              if (result !== undefined) {
                const body = typeof result === 'string' 
                  ? result 
                  : JSON.stringify(result);
                return new Response(body, {
                  status: responseStatus,
                  headers: { 'Content-Type': 'application/json', ...responseHeaders }
                });
              }
              
              // Default response with actual content
              return new Response('OK', { status: responseStatus, headers: responseHeaders });
            } catch (error) {
              console.error('Handler execution error:', error);
              return new Response('Internal Server Error', { status: 500 });
            }
          }

          return new Response('Not Found', { status: 404 });
        } catch (error) {
          console.error('Error handling request:', error);
          return new Response('Internal Server Error', { status: 500 });
        }
      }
    } as any);

    if (actualCallback) {
      actualCallback();
    }

    return this.server as any;
  }
}