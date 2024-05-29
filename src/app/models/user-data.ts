export interface UserData {
  firstName: string;
  lastName: string;
  enName: string;
  arName: string;
  dob: string;
  gender: 'male' | 'female';
  nationality: string;
  country: string;
  city: string;
  fullAddress: string;
  social?: JSON;
  bref?: string;
  imageUrl?: string;
  userId: number;
}
