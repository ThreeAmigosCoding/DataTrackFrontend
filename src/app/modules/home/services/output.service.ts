import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AnalogInput} from "../../../model/models";
import {Observable} from "rxjs";
import {domain} from "../../../environment";

@Injectable({
  providedIn: 'root'
})
export class OutputService {

  constructor(private http: HttpClient) { }

  changeAnalogOutputValue(IOAddress: string, value: number): Observable<any> {
    const queryParams = new HttpParams().set('ioAddress', IOAddress).set('value', value.toString());
    return this.http.put<any>(domain + "Output/ChangeAnalogOutputValue", null, { params: queryParams });
  }


  changeDigitalOutputValue(IOAddress: string, value: number): Observable<any> {
    const queryParams = new HttpParams().set('ioAddress', IOAddress).set('value', value.toString());
    return this.http.put<any>(domain + "Output/ChangeDigitalOutputValue", null, { params: queryParams });
  }
}
