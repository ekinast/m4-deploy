export class UserDTO {
  email: string;
  name: string;
  password: string;
  address: string;
  phone: string;
  country?: string | undefined;
  city?: string | undefined;

  constructor(
    email: string,
    name: string,
    password: string,
    address: string,
    phone: string,
    country?: string,
    city?: string,
  ) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.address = address;
    this.phone = phone;
    this.country = country;
    this.city = city;
  }
}
// Path: src/DTOs/UserDTO.ts
