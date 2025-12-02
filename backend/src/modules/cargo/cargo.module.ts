import { Module } from '@nestjs/common';
import { CargoController } from './controllers/cargo.controller';
import { CargoService } from './services/cargo.service';

@Module({
  controllers: [CargoController],
  providers: [CargoService],
  exports: [CargoService],
})
export class CargoModule {}
