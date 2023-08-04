export interface UserRegistration{
  firstName: string | null | undefined,
  lastName: string | null | undefined,
  email: string | null | undefined,
  password: string | null | undefined
}

export interface MyTokenResponse{
  token: string
}

export interface Device{
  id?: string,
  name: string,
  driver: string
  lowerBound: number,
  upperBound: number,
  isDigital: boolean
}

export interface DigitalInput{
  id?: string
  description: string,
  scanTime: number,
  createdBy: string,
  device: Device
}

export interface AnalogInput extends DigitalInput {
  lowLimit: number,
  highLimit: number,
  unit: string
}


export interface InputRecord {
  inputId: string,
  ioAddress: string,
  description: string,
  value: number,
  driver: string,
  deviceName: string,
  scanOn: boolean,
  isDigital: boolean,
  unit?: string,
  recordedAt: Date
}

export interface Alarm {
  type: AlarmType;
  priority: AlarmPriority;
  edgeValue: number;
  unit: string;
  analogInputId: string;
}

export interface AlarmDisplay extends Alarm {
  id: string;
}

export enum AlarmType{
  Lower = 0,
  Higher = 1
}

export enum AlarmPriority{
  Low = 0,
  Medium = 1,
  High = 2
}

export interface AlarmRecord {
  id: string;
  alarmDto: AlarmDisplay;
  value: number;
  recordedAt: Date;
}

export interface DateRange {
  startTime: string;
  endTime: string;
}

