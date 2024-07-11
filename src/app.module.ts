import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';


@Module({
  imports: [DatabaseModule, TodoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
