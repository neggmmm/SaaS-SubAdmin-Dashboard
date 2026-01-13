export class CreateUserDto {
  readonly username: string;
  readonly phoneNumber: string;
  readonly password: string;
  readonly email: string;
  readonly role: string | 'Customer';
}