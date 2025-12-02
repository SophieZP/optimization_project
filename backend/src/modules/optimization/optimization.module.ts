import { Module } from '@nestjs/common';
import { OptimizationController } from './controllers/optimization.controller';
import { OptimizationService } from './services/optimization.service';
import { TransportModule } from '../transport/transport.module';
import { CargoModule } from '../cargo/cargo.module';

@Module({
  imports: [TransportModule, CargoModule],
  controllers: [OptimizationController],
  providers: [OptimizationService],
  exports: [OptimizationService],
})
export class OptimizationModule {}
