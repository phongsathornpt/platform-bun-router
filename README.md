# BUN Router Adapter for NestJS

A custom HTTP adapter for NestJS that integrates with the Bun runtime, providing high-performance server capabilities.

## Features

- Full NestJS compatibility using `AbstractHttpAdapter`
- Native Bun.serve() integration
- Support for all HTTP methods (GET, POST, PUT, DELETE, etc.)
- CORS support
- Request/response handling
- Error handling
- Static file serving capabilities
- Template engine support

## Installation

```bash
bun install
```

## Usage

```typescript
import { NestFactory } from '@nestjs/core';
import { BunAdapter } from '@thorn/platform-bun-router';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new BunAdapter());
  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}

bootstrap();
```

## API

### BunAdapter

The main adapter class that extends `AbstractHttpAdapter` from `@nestjs/core`.

### Methods

- `reply(response, body, statusCode?)` - Send a response
- `status(response, statusCode)` - Set response status
- `end(response, message?)` - End the response
- `render(response, view, options)` - Render a view
- `redirect(response, statusCode, url)` - Redirect to a URL
- `setHeader(response, name, value)` - Set a response header
- `getHeader(response, name)` - Get a response header
- `listen(port, callback?)` - Start the server
- `close()` - Close the server
- `enableCors(options)` - Enable CORS

## Configuration

The adapter supports standard NestJS configuration options and can be customized for specific Bun runtime requirements.

## Development

```bash
# Install dependencies
bun install

# Run the example
bun run dev

# Build the project
bun run build

# Run tests
bun run test
```

## License

MIT