import { ICreateUserDto } from '@/Interfaces/Users/IUser';
import { User } from '@auth0/auth0-react';
import defaultBackground from '@/assets/backgroundImages//stars-background.webp';

export function GetPropertiesFromUserAuth0(user: User): ICreateUserDto {
  return {
    id: user.sub?.split('|')[1],
    givenName: user.given_name,
    familyName: user.family_name,
    nickname: user.nickname,
    wholeName: user.name,
    picture: user.picture,
    updatedAt: new Date(),
    email: user.email,
    emailVerified: user.email_verified,
    provider: user.sub?.split('|')[0],
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    backGroundImage: defaultBackground.split('/').pop(),
  };
}
