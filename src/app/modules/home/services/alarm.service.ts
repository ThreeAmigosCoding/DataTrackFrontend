import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {domain} from "../../../environment";
import {Alarm, AlarmDisplay, AlarmPriority, AlarmRecord, DateRange} from "../../../model/models";

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  alarmIds$ = new BehaviorSubject<string[]>([]);
  alarmIdsState$ = this.alarmIds$.asObservable();

  public setAlarmIdsState(alarmIds: string[]) {
    this.alarmIds$.next(alarmIds);
  }

  constructor(private http: HttpClient) { }

  public getAllUserAlarms(userId: string): Observable<string[]> {
    return this.http.get<string[]>(domain + "Alarm/GetAllUserAlarms/" + userId);
  }

  public addAlarm(alarm: Alarm): Observable<any> {
    return this.http.post<any>(domain + "Alarm/CreateAlarm", alarm);
  }

  public getInputAlarms(inputId: string): Observable<AlarmDisplay[]> {
    return this.http.get<AlarmDisplay[]>(domain + "Alarm/GetAllInputAlarms/" + inputId);
  }

  public deleteAlarm(id: string): Observable<any> {
    return this.http.delete<any>(domain + "Alarm/DeleteAlarm/" + id)
  }

  public getAlarmRecordsByTime(dateRange: DateRange): Observable<AlarmRecord[]> {
    return this.http.put<AlarmRecord[]>(domain + "Alarm/GetAlarmRecordsByTime", dateRange);
  }

  public getAlarmRecordsByPriority(priority: AlarmPriority): Observable<AlarmRecord[]> {
    const queryParams = new HttpParams()
      .set('priority', priority);
    return this.http.get<AlarmRecord[]>(domain + "Alarm/GetAlarmRecordsByPriority", { params: queryParams });
  }

}
