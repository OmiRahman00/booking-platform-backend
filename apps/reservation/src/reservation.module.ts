import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { DatabaseModule } from '@app/common/database/database.module';
import { ReservationsRepository } from './reservations.repository';
import { ReservationDocument, ReservationSchema } from './models/reservation.schema';

@Module({
  imports: [DatabaseModule,DatabaseModule.forFeature([
    { name: ReservationDocument.name, schema: ReservationSchema },
  ]),],
  controllers: [ReservationController],
  providers: [ReservationService,ReservationsRepository],
})
export class ReservationModule {}
