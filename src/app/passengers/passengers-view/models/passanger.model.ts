import { FormControl } from "@angular/forms";

export interface passangerModel {
    name: FormControl<string>,
    surname: FormControl<string>,
    gender: FormControl<boolean>,
    dateOfBirth: FormControl<string>,
    specialNeeds: FormControl<boolean>,
  }
  