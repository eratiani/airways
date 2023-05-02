import { createReducer, on } from '@ngrx/store';
import { FlightDataType } from '../models/flyght-data.model';
import { flightBackAdd, flightOneWayAdd, resetBackFlights } from './actions';
import { StoreType } from './store.model';

const initialState: StoreType['flightData'] = { oneWay: [] };
export const flightsReducer = createReducer(
  initialState,
  on(flightOneWayAdd, (state, { data }) => ({ ...state, oneWay: data })),
  on(flightBackAdd, (state, { data }) => ({ ...state, backWay: data })),
  on(resetBackFlights, (state) => ({ ...state, backWay: undefined }))
);
