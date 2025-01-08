import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationService {
  constructor(private readonly reservationsRepository: ReservationsRepository) {
  }
  //create a reservation
  create(createReservationDto: CreateReservationDto) {
    return this.reservationsRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId: '123',
    });
  }

  //find all reservations
  findAll() {
    return this.reservationsRepository.find({});
  }

  //find one reservation
  findOne(_id: string) {
    return this.reservationsRepository.findOne({ _id });
  }

  //update a reservation
  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  //remove a reservation
  remove(_id: string) {
    return this.reservationsRepository.findOneAndDelete({ _id });
  }
}
