import {Table, Column, Model, HasMany, BelongsTo, ForeignKey} from 'sequelize-typescript';
import {TodoList} from './todolist.model';
import {TodoItem} from './todoitem.model';

@Table
export class User extends Model<User> {

  @Column
  userName!: string;

  @Column
  isVerified!: boolean;

  @Column
  email!: string;

  @Column
  userGroup!: string;

  @Column
  password!: string;

  toSimplification(): any {
    return {
      'id': this.id,
      'username': this.userName,
      'isVerified': this.isVerified,
      'email': this.email,
      'userGroup': this.userGroup,
      'password': this.password,
    };
  }

  fromSimplification(simplification: any): void {
    this.userName = simplification['username'];
    this.isVerified = simplification['isVerified'];
    this.email = simplification['email'];
    this.userGroup = simplification['userGroup'];
    this.password = simplification['password'];

  }

  createAdminUser() {
    this.userName = 'admin';
    this.password = 'admin';
    this.userGroup = 'adminGroup';
    this.isVerified = true;
  }
}
