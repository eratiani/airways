import { createReducer, on } from '@ngrx/store';
import {
  flightBackAdd,
  flightOneWayAdd,
  resetBackFlights,
  selectFlight,
  setPassangersCount,
} from './actions';
import { StoreType } from './store.model';

const initialMatchedFlights: StoreType['flightData'] = { oneWay: [] };
export const flightsReducer = createReducer(
  initialMatchedFlights,
  on(flightOneWayAdd, (state, { data }) => ({ ...state, oneWay: data })),
  on(flightBackAdd, (state, { data }) => ({ ...state, backWay: data })),
  on(resetBackFlights, (state) => ({ ...state, backWay: undefined }))
);

const initialSelectedFlight: StoreType['selectedFlight'] = {};
export const selectedFlihgtReducer = createReducer(
  initialSelectedFlight,
  on(selectFlight, (state, { oneWay, backWay }) => ({ oneWay, backWay }))
);

const initialPassangers: StoreType['passengersCount'] = {};
export const passangersCountReducer = createReducer(
  initialPassangers,
  on(setPassangersCount, (state, { adult, child, infant }) => ({
    adult,
    child,
    infant,
  }))
);
