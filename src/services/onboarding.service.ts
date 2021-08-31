import { Pet, PetsPreference } from '../types';
import axios from '../utils/axios';

const ONBOARDING_API_URL = '/onboarding/';

const housingLiving = (extraRoom: boolean, address: string, radius: number) => {
  return axios.post(ONBOARDING_API_URL, { extraRoom, address, radius });
};

const housingPreferences = (preferences: string[]) => {
  return axios.post(ONBOARDING_API_URL, { preferences });
};

const careHours = (hours: string) => {
  return axios.post(ONBOARDING_API_URL, { hours });
};

const careTasks = (tasks: string[]) => {
  return axios.post(ONBOARDING_API_URL, { tasks });
};

const roommateGender = (gender: string) => {
  return axios.post(ONBOARDING_API_URL, { gender });
};

const roommatePets = (roommatePet: PetsPreference[]) => {
  return axios.post(ONBOARDING_API_URL, { roommatePet });
};

const myPets = (pets: Pet[]) => {
  return axios.post(ONBOARDING_API_URL, { pets });
};

const storyGender = (gender: string) => {
  return axios.post(ONBOARDING_API_URL, { gender });
};

const storyLifestyle = (smoking: boolean, drinking: boolean) => {
  return axios.post(ONBOARDING_API_URL, { smoking, drinking });
};

const storyReference = (reference: string[]) => {
  return axios.post(ONBOARDING_API_URL, { reference });
};

const onboardingService = {
  housingLiving,
  housingPreferences,
  careHours,
  careTasks,
  roommateGender,
  roommatePets,
  storyGender,
  myPets,
  storyLifestyle,
  storyReference,
};

export default onboardingService;
