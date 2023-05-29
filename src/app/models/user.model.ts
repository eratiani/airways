import { UserReservation } from './flyght-data.model';

export interface UserData {
  email: string;
  password: string;
  id: number;
  age: number;
  country: string;
  gender: string;
  reservations: UserReservation[];
}
