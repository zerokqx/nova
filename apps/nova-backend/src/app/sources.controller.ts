import { Get, Controller, Query } from '@nestjs/common';
import { ModelService } from './model.service';
@Controller('sources')
export class SourcesController {
  constructor(private readonly models: ModelService) {}

  @Get('all')
  all() {
    return 'all sources';
  }

  @Get('one')
  async one(@Query('name') name: string, @Query('f') f: string) {
    const d = await this.models.getForSourceWithNotation({ source_id: 1 });
    return d;
  }
}
