import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
