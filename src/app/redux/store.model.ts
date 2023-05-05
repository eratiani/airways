import {
  FlightDataType,
  ReservationDataType,
} from '../models/flyght-data.model';

export interface StoreType {
  flightData: {
    oneWay: FlightDataType[];
    backWay?: FlightDataType[];
  };
  selectedFlight: {
    oneWay?: FlightDataType;
    backWay?: FlightDataType;
  };
  passengersCount: Partial<
    Record<keyof ReservationDataType['passengers'], number>
  >;
}
