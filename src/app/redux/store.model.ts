import { FlightDataType } from '../models/flyght-data.model';

export interface StoreType {
  flightData: {
    oneWay: FlightDataType[];
    backWay?: FlightDataType[];
  };
  selectedFlight: {
    oneWay?: FlightDataType;
    backWay?: FlightDataType;
  };
}
