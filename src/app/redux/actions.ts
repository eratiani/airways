import { createAction, props } from '@ngrx/store';
import { FlightDataType } from '../models/flyght-data.model';

export const addFlightData = createAction(
  '[Flight data] save',
  props<{ data: FlightDataType[] }>()
);
