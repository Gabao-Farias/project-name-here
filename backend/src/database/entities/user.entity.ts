import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  user_id: string;

  @Column("text")
  name: string;

  @Column("text")
  password: string;
}
