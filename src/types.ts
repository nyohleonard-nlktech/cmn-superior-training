export type Language = 'en' | 'fr';

export interface Registration {
  id: string;
  name: string;
  phone: string;
  location: string;
  about: string;
  preferred_month: string;
  preferred_location: string;
  training_interest?: string;
  paid: boolean;
  completed?: boolean;
  notes?: string;
  created_at: string;
}

export interface Product {
  id: string;
  name_en: string;
  name_fr: string;
  price: number;
  description_en: string;
  description_fr: string;
  photo_url: string;
  category: 'soap' | 'raw_material' | 'equipment' | 'food_ingredients';
  in_stock: boolean;
  unit?: string;
}

export interface TrainingAnnouncement {
  id: string;
  period_text_en: string;
  period_text_fr: string;
  location_en: string;
  location_fr: string;
  active: boolean;
  created_at: string;
}

export interface SiteSettings {
  id: string;
  whatsapp_community_link: string;
  whatsapp_admin_phone: string;
  company_name: string;
  email: string;
  address_en: string;
  address_fr: string;
  updated_at: string;
}

export interface TrainingStep {
  step: number;
  title_en: string;
  title_fr: string;
  description_en: string;
  description_fr: string;
}

export interface TrainingProgram {
  id: string;
  name_en: string;
  name_fr: string;
  tagline_en: string;
  tagline_fr: string;
  description_en: string;
  description_fr: string;
  image: string;
  total_steps: number;
  steps: TrainingStep[];
  highlights_en: string[];
  highlights_fr: string[];
}
