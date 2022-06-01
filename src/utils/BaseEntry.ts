import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
export class BaseEntry extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({
    length: 10,
  })
  phone: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    select: false,
  })
  password?: string;

  @Column()
  branch_id: string;

  @Column({
    nullable: true,
  })
  account_number: string;

  @Column({
    type: "datetime",
    default: () => "NOW()",
  })
  Update_At: Date;

  hasPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  checkIfUnencriptedPasswordIsValid(unencriptedPassword: string) {
    this.password = unencriptedPassword;
  }
}
