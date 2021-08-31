import { Profile } from './profile';

export type User = {
  id: number;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  image: string;
  profile: Profile;
  slug: string;
};
