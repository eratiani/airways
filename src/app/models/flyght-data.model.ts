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

export type SearchParamsType = Partial<{
  oneWay: boolean;
  from: string;
  to: string;
  date: Partial<{
    startDate: string;
    endDate: string;
  }>;
  passengers: { adult: number; child: number; infant: number };
}>;

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
  contact: Partial<{'email':string, 'country':Record<'name' | 'alpha2Code'| "callingCode" | 'alpha3Code' | 'numericCode', string>, 'telephone':string}>;
}

export interface UserReservation {
  flights: StoreType['selectedFlight'];
  passeng: ReservationDataType;
  payed?: boolean;
}
