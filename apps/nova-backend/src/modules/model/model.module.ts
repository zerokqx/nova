import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { notation } from '@lib/notation';

@Module({
  controllers: [ModelController],
  providers: [
    ModelService,

    {
      provide: 'NOTATION',
      useValue: notation,
    },
  ],
})
export class ModelModule { }
