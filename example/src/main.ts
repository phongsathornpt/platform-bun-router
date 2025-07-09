import { NestFactory } from '@nestjs/core';
import { Module, Controller, Get } from '@nestjs/common';
import { BunAdapter } from '../../adapter/bun-adapter';

@Controller()
class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('health')
  getHealth(): object {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}

@Module({
  controllers: [AppController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new BunAdapter());
  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}

bootstrap();
