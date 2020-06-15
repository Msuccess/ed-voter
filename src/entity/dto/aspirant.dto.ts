import { IsNotEmpty, IsNumber, IsString, IsEmail } from 'class-validator';

export class AspirantDto {
  @IsNotEmpty({ message: 'FirstName must be provided' })
  @IsString()
  firstname: string;

  @IsNotEmpty({ message: 'Email must be provided' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'LastName must be provided' })
  @IsString()
  lastname: string;

  @IsNotEmpty({ message: 'Department must be provided' })
  department: string;

  @IsNotEmpty({ message: 'Office must be provided' })
  office: string;

  @IsNotEmpty({ message: 'Gender must be provided' })
  gender: string;

  photo: string;

  @IsNotEmpty({ message: 'Position must be provided' })
  @IsNumber()
  position: number;

  @IsNotEmpty({ message: 'Year must be provided' })
  @IsNumber()
  year: number;
}
