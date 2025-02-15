export interface IVerifyAccoundResponse {
  id: number;
  isNewUser: boolean;
}

export interface ICreateUserDto {
  id: string;
  givenName?: string;
  familyName?: string;
  nickname?: string;
  wholeName?: string;
  picture?: string;
  updatedAt?: Date;
  email?: string;
  emailVerified?: boolean;
  provider: string;
  timeZone: string;
  backGroundImage?: string;
}
