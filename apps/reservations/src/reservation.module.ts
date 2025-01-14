import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { DatabaseModule } from '@app/common/database/database.module';
import { ReservationsRepository } from './reservations.repository';
import { ReservationDocument, ReservationSchema } from './models/reservation.schema';
import { LoggerModule } from '@app/common/logger/logger.module';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@app/common/constants/services';

@Module({
  imports: [LoggerModule,DatabaseModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      MONGODB_URI: Joi.string().required(),
      PORT: Joi.number().required(),
    }),
  }),
    ClientsModule.registerAsync([{
    name: AUTH_SERVICE,
      useFactory: (configService: ConfigService) =>({
      transport: Transport.TCP,
      options: {
        host: configService.get('AUTH_HOST'),
        port: configService.get('AUTH_PORT'),
      }
      }),
      inject: [ConfigService],
    }])
  ],
  controllers: [ReservationController],
  providers: [ReservationService,ReservationsRepository],
})
export class ReservationModule {}
