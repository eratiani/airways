import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlightDataType, UserReservation } from '../models/flyght-data.model';
import { UserData } from '../models/user.model';
import { map, mergeMap } from 'rxjs';

const SERVER = 'http://localhost:3000';
type RespType = { accessToken: string; user: UserData };

@Injectable({ providedIn: 'root' })
export class RequestService {
  constructor(private http: HttpClient) {}

  getFlights() {
    return this.http.get<FlightDataType[]>(`${SERVER}/data`);
  }

  registerUser(user: Partial<UserData>) {
    return this.http.post<RespType>(`${SERVER}/register`, user);
  }

  login(email: string, password: string) {
    return this.http.post<RespType>(`${SERVER}/login`, { email, password });
  }

  getUserReservations(id: number) {
    return this.http
      .get<UserData>(`${SERVER}/users/${id}`)
      .pipe(map((user) => user.reservations));
  }

  addReservation(id: number, newReservation: UserReservation) {
    return this.getUserReservations(id).pipe(
      mergeMap((userReserv) => {
        let reservations: UserReservation[];
        if (userReserv) {
          reservations = [...userReserv];
          reservations.push(newReservation);
        } else {
          reservations = [newReservation];
        }
        return this.http.patch(`${SERVER}/users/${id}`, { reservations });
      })
    );
  }

  deleteReservation(userId: number, reservNo: number) {
    return this.getUserReservations(userId).pipe(
      mergeMap((userReserv) => {
        const reservations = [...userReserv];
        reservations.splice(reservNo, 1);
        return this.http.patch<UserData>(`${SERVER}/users/${userId}`, {
          reservations,
        });
      })
    );
  }

  editReservation(
    userId: number,
    reservNo: number,
    reservation: UserReservation
  ) {
    return this.getUserReservations(userId).pipe(
      mergeMap((userReserv) => {
        const reservations = userReserv;
        reservations[reservNo] = reservation;
        return this.http.patch<UserData>(`${SERVER}/users/${userId}`, {
          reservations,
        });
      })
    );
  }
}
