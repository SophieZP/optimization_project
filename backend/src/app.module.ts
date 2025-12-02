import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransportModule } from './modules/transport/transport.module';
import { CargoModule } from './modules/cargo/cargo.module';
import { OptimizationModule } from './modules/optimization/optimization.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TransportModule,
    CargoModule,
    OptimizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
