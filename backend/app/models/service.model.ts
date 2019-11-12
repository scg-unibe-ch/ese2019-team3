import {Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import {User} from './User.model';


@Table
export class Service extends Model<Service> {

  @Column
  provider!: string;

  @Column
  serviceTitle!: string;

  @Column
  description!: string;

//  @ForeignKey((user: User) => user.id)
  @Column
  providerId!: number;

  @Column
  serviceType!: string;

  @Column
  price!: number;

   @Column
  city!: string;

//   @Column
//   availableDates!: Date[];


  toSimplification(): any {
    return {
      'serviceTitle': this.serviceTitle,
      'serviceType': this.serviceType,
      'provider': this.provider,
      'providerId': this.providerId,
      'price': this.price,
      'description': this.description,
      'city': this.city,
 //     'availableDates': this.availableDates
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
//    this.availableDates = simplification['availableDates']

  }

}
