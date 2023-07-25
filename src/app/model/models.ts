export interface UserRegistration{
  firstName: string | null | undefined,
  lastName: string | null | undefined,
  email: string | null | undefined,
  password: string | null | undefined
}

export interface MyTokenResponse{
  token: string
}
