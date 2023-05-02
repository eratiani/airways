import { createReducer, on } from '@ngrx/store';
import {
  flightBackAdd,
  flightOneWayAdd,
  resetBackFlights,
  selectOneWayFlight,
} from './actions';
import { StoreType } from './store.model';

const initialMatchedFlights: StoreType['flightData'] = { oneWay: [] };
export const flightsReducer = createReducer(
  initialMatchedFlights,
  on(flightOneWayAdd, (state, { data }) => ({ ...state, oneWay: data })),
  on(flightBackAdd, (state, { data }) => ({ ...state, backWay: data })),
  on(resetBackFlights, (state) => ({ ...state, backWay: undefined }))
);

const initialSelectedFlight = {
  oneWay: {},
};
export const selectedFlihgtReducer = createReducer(
  initialSelectedFlight,
  on(selectOneWayFlight, (state, { data }) => ({ ...state, oneWay: data }))
);
