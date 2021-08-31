export enum ProfileType {
  SR = 'CAREGIVER',
  RUMI = 'CARERECEIVER',
}

export enum ContactType {
  CASE_MANAGER = 'CASE_MANAGER',
  ALTERNATIVE = 'ALTERNATIVE',
}

export enum ReferenceOption {
  BRIDGES_EMPLOYEE_OR_RESIDENT = 'BRIDGES_EMPLOYEE_OR_RESIDENT',
  BUS_OR_LIGHT_RAIL = 'BUS_OR_LIGHT_RAIL',
  CASE_MANAGER_OR_SOCIAL_WORKER = 'CASE_MANAGER_OR_SOCIAL_WORKER',
  GOOGLE = 'GOOGLE',
  INDEED = 'INDEED',
  MEDIA_NEWS = 'MEDIA_NEWS',
  FACEBOOK = 'FACEBOOK',
  INSTAGRAM = 'INSTAGRAM',
  LINKEDIN = 'LINKEDIN',
  IM_NOT_SURE = 'IM_NOT_SURE',
  OTHER = 'OTHER',
}

export enum ProfileStatus {
  ONBOARDING = 'ONBOARDING',
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  IN_PROCESS = 'IN_PROCESS',
  MOVED_IN = 'MOVED_IN',
  DENIED = 'DENIED',
  MIGRATING = 'MIGRATING',
}

export enum Pet {
  CAT = 'CAT',
  DOG = 'DOG',
  OTHER = 'OTHER',
  NONE = 'NONE',
}

export enum PetsPreference {
  CAT = 'CAT',
  DOG = 'DOG',
  NO_PREFERENCE = 'NO_PREFERENCE',
  NONE = 'NONE',
}

export enum WheelchairPreference {
  NO_PREFERENCE = 'NO_PREFERENCE',
  REQUIRED = 'REQUIRED',
}

export enum Gender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  OTHER = 'OTHER',
}

export enum GenderPreference {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  OTHER = 'OTHER',
  NO_PREFERENCE = 'NO_PREFERENCE',
}

export enum ChoiceType {
  YES = 'YES',
  NO = 'NO',
  DEPENDS = 'DEPENDS',
  WANTS = 'WANTS',
}

export enum Lifestyle {
  NEVER = 'NEVER',
  OCCASIONALLY = 'OCCASIONALLY',
  FREQUENTLY = 'FREQUENTLY',
}

export enum CareHours {
  LESS_THAN_10_HOURS = 'LESS_THAN_10',
  BETWEEN_10_AND_20_HOURS = '10_20',
  BETWEEN_20_AND_30_HOURS = '20_30',
  BETWEEN_30_AND_40_HOURS = '30_40',
  MORE_THAN_40 = 'MORE_THAN_40',
  NOT_SURE = 'NOT_SURE',
  NO_PREFERENCE = 'NO_PREFERENCE',
}

export enum CareTasks {
  BUDGETING = 'BUDGETING',
  COMPANIONSHIP = 'COMPANIONSHIP',
  COPING_SKILLS = 'COPING_SKILLS',
  CLEANING = 'CLEANING',
  MEDICATION = 'MEDICATION',
  MEAL_PREP = 'MEAL_PREP',
  MOBILITY = 'MOBILITY',
  PERSONAL_CARE = 'PERSONAL_CARE',
  PROBLEM_SOLVING = 'PROBLEM_SOLVING',
  TRANSPORTATION = 'TRANSPORTATION',
  NOT_SURE = 'NOT_SURE',
  OTHER = 'OTHER',
}

export enum HousingRequirements {
  ALCOHOL_FREE = 'ALCOHOL_FREE',
  CLOSE_TO_PUBLIC_TRANSIT = 'CLOSE_TO_PUBLIC_TRANSIT',
  NO_STAIRS = 'NO_STAIRS',
  ROLL_IN_SHOWER = 'ROLL_IN_SHOWER',
  SMOKE_FREE = 'SMOKE_FREE',
  WHEELCHAIR_ACCESSIBLE = 'WHEELCHAIR_ACCESSIBLE',
  FIRST_FLOOR_BEDROOM = 'FIRST_FLOOR_BEDROOM',
  OTHER = 'OTHER',
}

export enum PetProfile {
  CAT = 'Cat',
  DOG = 'Dog',
  OTHER = 'Other',
  NONE = 'None',
  WANTS = 'None, but I want one',
  NO_PREFERENCE = 'No preference',
}

export enum GenderProfile {
  FEMALE = 'Female',
  MALE = 'Male',
  OTHER = 'Other',
  NO_PREFERENCE = 'No preference',
}

export enum PetSearchPreferences {
  CAT = 'No cats',
  DOG = 'No dogs',
  NONE = 'No pets',
  NO_PREFERENCE = 'No preference',
}

export enum GenderSearchPreferences {
  FEMALE = 'Female roommate',
  MALE = 'Male roommate',
  NO_PREFERENCE = 'No preference',
}

export enum WheelchairSearchPreferences {
  REQUIRED = 'Required',
  NO_PREFERENCE = 'No preference',
}

export enum CareHoursProfile {
  LESS_THAN_10 = 'Less than 10 hours',
  '10_20' = '10 to 20 hours',
  '20_30' = '20 to 30 hours',
  '30_40' = '30 to 40 hours',
  MORE_THAN_40 = 'More than 40 hours',
  NOT_SURE = 'Not sure',
  NO_PREFERENCE = 'No preference',
}

export enum HousingRequirementsProfile {
  ALCOHOL_FREE = 'Alcohol-free household',
  SMOKE_FREE = 'Smoke-free household',
  FIRST_FLOOR_BEDROOM = '1st floor bedroom',
  RAMP = 'Ramp',
  CLOSE_TO_PUBLIC_TRANSIT = 'Close to public transportation',
  NO_STAIRS = 'Cannot have stairs',
  ROLL_IN_SHOWER = 'Roll in shower',
  WHEELCHAIR_ACCESSIBLE = 'Wheelchair accessible',
  OTHER = 'Other',
}

export enum CareTasksProfile {
  BUDGETING = 'Budgeting',
  COMPANIONSHIP = 'Companionship',
  COPING_SKILLS = 'Coping skills',
  CLEANING = 'Cleaning',
  MEDICATION = 'Medications',
  MEAL_PREP = 'Meal prepping',
  MOBILITY = 'Mobility',
  PERSONAL_CARE = 'Personal care',
  PROBLEM_SOLVING = 'Problem solving',
  TRANSPORTATION = 'Transportation',
  NOT_SURE = 'Not sure',
  OTHER = 'Other',
}

export enum ReferenceOptionProfile {
  BRIDGES_EMPLOYEE_OR_RESIDENT = 'Bridges employee or resident',
  BUS_OR_LIGHT_RAIL = 'Bus or light rail',
  CASE_MANAGER_OR_SOCIAL_WORKER = 'Case Manager or Social Worker',
  GOOGLE = 'Google',
  INDEED = 'Indeed',
  MEDIA_NEWS = 'Media/News',
  FACEBOOK = 'Facebook',
  INSTAGRAM = 'Instagram',
  LINKEDIN = 'LinkedIn',
  IM_NOT_SURE = 'Not sure',
  OTHER = 'Other',
}

export enum UserProfileType {
  CARERECEIVER = 'Rumi',
  CAREGIVER = 'Supportive Roommate',
}

export enum WaveStatus {
  NONE = 'NONE',
  SENT = 'SENT',
  RECEIVED = 'RECEIVED',
}

export enum ConnectionStatus {
  ALREADY_MADE = 'ALREADY_MADE',
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  IGNORED = 'IGNORED',
  UNMATCHED = 'UNMATCHED',
  ADMIN = 'ADMIN',
}
