import {BelongsTo, Column, Model, Table} from 'sequelize-typescript';
import {Booking} from './booking.model';
import {Sequelize} from 'sequelize-typescript';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';
import sequelize from 'sequelize';

@Table
export class Service extends Model<Service> {


  @Column
  provider!: string;

  @Column
  serviceTitle!: string;

  @Column
  description!: string;


  @Column
  providerId!: number;

  @Column
  serviceType!: string;

  @Column
  price!: string;

   @Column
  city!: string;

   @Column
   rating!: number;




  toSimplification(): any {
    return {
       'id': this.id,
      'serviceTitle': this.serviceTitle,
      'serviceType': this.serviceType,
      'provider': this.provider,
      'providerId': this.providerId,
      'price': this.price,
      'description': this.description,
      'city': this.city,
      'rating': this.rating
    };
  }

  fromSimplification(simplification: any): void {
    this.serviceTitle = simplification['serviceTitle'];
    this.serviceType = simplification['serviceType'];
    this.provider = simplification['provider'];
    this.providerId = simplification['providerId'];
    this.price = simplification['price'];
    this.description = simplification['description'];
    this.city = simplification['city'];
    this.rating = simplification['rating'];

  }

  createDummyService() {
    this.provider = 'peter';
    this.serviceTitle = 'essen';
    this.description = 'Sehr feines Essen';
    this.providerId = 2;
    this.price = "50";
    this.city= 'Bern';
    this.rating = 2;
  }


}



