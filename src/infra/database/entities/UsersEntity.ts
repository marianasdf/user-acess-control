import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import crypto from 'crypto'

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryColumn()
  id: string

  @Column()
  username: string

  @Column()
  password: number

  @CreateDateColumn()
  created_at: Date

  @BeforeInsert()
  setId () {
    this.id = crypto.randomUUID()
  }
}
