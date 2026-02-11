export type HeroContent = {
  title: string;
  subTitle: string;
  primaryButtonText: string;
  secondaryButtonText: string;
};

export type Statistic = {
  id: string;
  label: string;
  value: number;
  createdAt: string;
  updatedAt: string;
};

export type ImpactMetric = {
  id: string;
  label: string;
  value: number;
  createdAt: string;
  updatedAt: string;
};

export type Testimonial = {
  id: string;
  speaker: string;
  role: string;
  statement: string;
  createdAt: string;
  updatedAt: string;
};

export type AboutSection = {
  id: string;
  description: string;
  missionDescription: string;
  visionDescription: string;
  createdAt: string;
  updatedAt: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  description: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
};

export type Sponsor = {
  id: string;
  name: string;
  description?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  time?: string;
  type?: string;
  description?: string;
  attendees?: number;
  createdAt: string;
  updatedAt: string;
};

export type Social = {
  id: string;
  platform: string;
  url: string;
  createdAt: string;
  updatedAt: string;
};

export type KeyVoice = {
  id: string;
  name: string;
  description: string;
  followers?: number | null;
  focusAreaId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type InspiringStory = {
  id: string;
  speaker: string;
  story: string;
  focusAreaId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SupportingOrganization = {
  id: string;
  name: string;
  description: string;
  email: string;
  website?: string | null;
  focusAreaId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type FocusArea = {
  id: string;
  title: string;
  images: string[];
  hashTag: string;
  description: string;
  statsLabel?: string;
  statsValue?: string;
  keyVoices?: KeyVoice[];
  inspiringStories?: InspiringStory[];
  supportingOrganizations?: SupportingOrganization[];
  createdAt?: string;
  updatedAt?: string;
};
