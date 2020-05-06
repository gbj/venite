import { Module } from '@nestjs/common';
import { EditorGateway } from './editor.gateway';

@Module({
    providers: [ EditorGateway ]
})
export class EditorModule {}
