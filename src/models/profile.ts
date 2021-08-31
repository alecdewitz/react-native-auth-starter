import { ProfileType } from './profileType';

export type Profile = {
  age: number;
  alreadyMade: boolean;
  bio: string;
  finishedOnboarding: boolean;
  gender: string;
  hoursWeek: number;
  type: ProfileType;
};
