import {Table, Column, Model, HasMany, BelongsTo, ForeignKey, Unique} from 'sequelize-typescript';
import {TodoList} from './todolist.model';
import {TodoItem} from './todoitem.model';

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
   vorname!: string;

    @Column
    nachname!: string;

    @Column
    Adresse!: string;

    @Column
    telefon!: string;


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
    this.password = 'admin';
    this.userGroup = 'adminGroup';
    this.isVerified = true;
  }
}
