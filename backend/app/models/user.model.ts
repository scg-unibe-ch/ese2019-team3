import {Table, Column, Model, HasMany, BelongsTo, ForeignKey, Unique} from 'sequelize-typescript';
const bcrypt = require('bcryptjs');  //used to hash passwords
@Table
export class User extends Model<User> {

  @Column
  isVerified!: boolean;

  @Unique
  @Column({unique: true})
  email!: string;

  @Column
  userGroup!: string;

  @Column
  password!: string;

   @Column
   firstname!: string;

    @Column
    lastname!: string;

    @Column
    adress!: string;

    @Column
    number!: string;

    @Column!
    birthday!: string;


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

  createAdminUser() {
    this.email = 'admin';
    this.password = bcrypt.hashSync('admin', 8);
    this.userGroup = 'adminGroup';
    this.isVerified = true;
  }

  setPassword(newPassword: string) {
      this.password = newPassword;
      this.save();
    }

}
