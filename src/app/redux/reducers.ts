import { createReducer, on } from '@ngrx/store';
import { FlightDataType } from '../models/flyght-data.model';
import { addFlightData } from './actions';

const initialState: FlightDataType[] = [];
export const flightsReducer = createReducer(
  initialState,
  on(addFlightData, (state, { data }) => data)
);
