import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EditorModule } from './editor/editor.module';

@Module({
  imports: [EditorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
