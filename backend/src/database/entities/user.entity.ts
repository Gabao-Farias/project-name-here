import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  user_id: string;

  @Column("text")
  email: string;

  @Column("text")
  password: string;
}
