import {BelongsTo, Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import {User} from './user.model';
import {Service} from './service.model';

@Table
export class Booking extends Model<Booking> {

    @BelongsTo(() => Service, {
        foreignKey: 'serviceId',
        as: 'serviceInfo',
        targetKey: 'id',
    })
  @Column
  providerId!: number;

  @ForeignKey(() => User)
  @Column
  clientId!: number;

  @ForeignKey(() => Service)
  @Column
  serviceId!: number;

  @Column
  date!: number;

  @Column
  rating!: number;

  @Column
  bookingStatus!: string;

  toSimplification(): any {
    return {
      'id' : this.id,
      'providerId': this.providerId,
      'clientId': this.clientId,
      'serviceId': this.serviceId,
      'date': this.date,
      'rating': this.rating,
      'bookingStatus': this.bookingStatus
    };
  }

  fromSimplification(simplification: any): void {
    this.providerId = simplification['providerId'];
    this.clientId = simplification['clientId'];
    this.serviceId = simplification['serviceId'];
    this.date = simplification['date'];
    this.rating = simplification['rating'];
    this.bookingStatus = simplification['bookingStatus'];
  }

  createDummyBooking() {
    this.providerId = 1;
    this.clientId = 1;
    this.serviceId = 1;
    this.date = '10-10-2000';
    this.bookingStatus = 'request';
  }
}

