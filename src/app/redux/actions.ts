import { createAction, props } from '@ngrx/store';
import { FlightDataType } from '../models/flyght-data.model';
import { StoreType } from './store.model';

export const flightOneWayAdd = createAction(
  '[flights one way] save',
  props<{ data: FlightDataType[] }>()
);

export const flightBackAdd = createAction(
  '[flights back] save',
  props<{ data: FlightDataType[] }>()
);

export const resetBackFlights = createAction('[flights back] reset');

export const selectFlight = createAction(
  '[selected fligths] save',
  props<StoreType['selectedFlight']>()
);
