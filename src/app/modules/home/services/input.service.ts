import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AnalogInput, DigitalInput} from "../../../model/models";
import {Observable} from "rxjs";
import {domain} from "../../../environment";

@Injectable({
  providedIn: 'root'
})
export class InputService {

  constructor(private http: HttpClient) { }

  createAnalogInput(input: AnalogInput): Observable<any> {
    return this.http.post<any>(domain + "input/CreateAnalogInput", input);
  }

  createDigitalInput(input: DigitalInput): Observable<any> {
    return this.http.post<any>(domain + "input/CreateDigitalInput", input);
  }
}
