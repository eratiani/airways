import { StoreType } from '../redux/store.model';

export interface FlightDataType {
  from: string;
  to: string;
  date: string;
  available_seats: number;
  total_seats: number;
  cost: number;
  id: string;
}

export interface PassengerType {
  name: string;
  surname: string;
  gender: string;
  dOb: string;
  specialNeeds: boolean;
  baggage?: number;
}
export interface ReservationDataType {
  passengers: Partial<
    Record<'adult' | 'child' | 'infant', Partial<PassengerType>[]>
  >;
  contact: Partial<Record<'email' | 'country' | 'telephone', string>>;
}

export interface UserReservation {
  flights: StoreType['selectedFlight'];
  passeng: ReservationDataType;
}
