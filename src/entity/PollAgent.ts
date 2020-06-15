import { BaseEntity } from './BaseEntity';
import { Entity, Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity('PollAgentTb')
export class PollAgent extends BaseEntity {
  @Column()
  @IsNotEmpty({ message: 'Lastname must be provided' })
  pin: number;
}
