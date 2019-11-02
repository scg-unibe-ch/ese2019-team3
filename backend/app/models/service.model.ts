import {Table, Column, Model, HasMany, BelongsTo, ForeignKey, Unique} from 'sequelize-typescript';
import {User} from './User.model';


@Table
export class Service extends Model<Service> {

  @Column
  provider!: boolean;

  @ForeignKey(() => User)
  @Column
  providerId!: string;

  @Column
  serviceType!: string;

  @Column
  price!: string;

   @Column
  city!: string;


  toSimplification(): any {
    return {
      'id': this.id,
      'isVerified': this.isVerified,
      'email': this.email,
      'userGroup': this.userGroup,
      'password': this.password,
    };
  }

  fromSimplification(simplification: any): void {
    this.isVerified = simplification['isVerified'];
    this.email = simplification['email'];
    this.userGroup = simplification['userGroup'];
    this.password = simplification['password'];

  }

}
