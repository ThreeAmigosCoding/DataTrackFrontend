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
