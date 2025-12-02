import { Module } from '@nestjs/common';
import { TransportController } from './controllers/transport.controller';
import { TransportService } from './services/transport.service';

@Module({
  controllers: [TransportController],
  providers: [TransportService],
  exports: [TransportService],
})
export class TransportModule {}
