import { Module } from '@nestjs/common';
import { PrismaModule } from '@moduleShared/prisma/prisma.module';
import { ModelModule } from '@modules/model/model.module';
import { DataModule } from '@moduleShared/data/data.module';
import { SourcesModule } from '@modules/sources/sources.module';
import { KeysModule } from '@modules/keys/keys.module';
import { AiModule } from '@modules/ai/ai.module';
import { MessagesModule } from '@modules/messages/messages.module';
import { ChatsModule } from '@modules/chats/chats.module';

@Module({
  imports: [
    PrismaModule,
    ModelModule,
    DataModule,
    SourcesModule,
    KeysModule,
    AiModule,
    MessagesModule,
    ChatsModule,
  ],
})
export class AppModule {}
