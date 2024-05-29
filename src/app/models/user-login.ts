export interface UserLogin {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobile: string;
  emailVerification?: boolean;
  smsVerification?: boolean;
}
