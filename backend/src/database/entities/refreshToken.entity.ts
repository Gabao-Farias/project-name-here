import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  user_id: string;

  @Column("text")
  refresh_token: string;
}
