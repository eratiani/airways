import { Injectable } from '@angular/core';
import { UserReservation } from '../models/flyght-data.model';

@Injectable({
  providedIn: 'root',
})
export class PassangerDataService {
  passangerData!: UserReservation;
  index!: number;
  isEditMode: boolean = false;
  // constructor() { }
}
