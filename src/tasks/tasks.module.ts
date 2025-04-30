import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { APP_GUARD } from '@nestjs/core';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), FirebaseModule],
  controllers: [TasksController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: FirebaseAuthGuard,
    },
    TasksService,
    FirebaseAuthGuard,
  ],
})
export class TasksModule {}
