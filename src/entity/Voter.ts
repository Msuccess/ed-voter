import { BaseEntity } from './BaseEntity';
import { Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

export class Voter extends BaseEntity {
  @Column()
  @IsNotEmpty({ message: 'Phone must be provided' })
  phone: string;

  @Column()
  @IsNotEmpty({ message: 'programme must be provided' })
  programme: string;

  @Column()
  @IsNotEmpty({ message: 'IndexNumber must be provided' })
  indexnumber: string;

  @Column()
  @IsNotEmpty({ message: 'Photo must be provided' })
  photo: string;
}
