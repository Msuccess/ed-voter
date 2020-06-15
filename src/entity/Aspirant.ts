import { Entity, Column, Unique } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity } from './BaseEntity';

@Entity('AspirantTb')
@Unique(['email'])
export class Aspirant extends BaseEntity {
  @Column()
  department: string;

  @IsNotEmpty()
  @Column()
  email: string;

  @Column()
  office: string;

  @Column()
  gender: string;

  @Column()
  @IsNotEmpty({ message: 'Photo must be provided' })
  photo: string;

  @Column()
  @IsNotEmpty({ message: 'Position must be provided' })
  position: number;

  @Column()
  @IsNotEmpty()
  year: number;
}
