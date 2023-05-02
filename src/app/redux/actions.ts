import { createAction, props } from '@ngrx/store';
import { FlightDataType } from '../models/flyght-data.model';

export const flightOneWayAdd = createAction(
  '[flights one way] save',
  props<{ data: FlightDataType[] }>()
);

export const flightBackAdd = createAction(
  '[flights back] save',
  props<{ data: FlightDataType[] }>()
);

export const resetBackFlights = createAction('[flights back] reset');

export const selectOneWayFlight = createAction(
  '[flights one way] save',
  props<{ data: FlightDataType }>()
);
