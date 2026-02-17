export type Menu = {
  id: number;
  title: string;
  path?: string;
  newTab: boolean;
  submenu?: Menu[];
};

export type User = {
  id: number;
  name: string;
  token: string;
  email: string;

  created_at: string;
};

export type Meta = {
  current_page: number;
  from: number;
  last_page: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type ApiResponse<T> = {
  status: "success" | "error";
  result: {
    data: T;
    meta?: Meta;
  };
  message: string;
};

export type Unit = {
  id: number;
  project_id: number;
  unit_number: string | null;
  title: string | null;
  description: string | null;
  image: string | null;
  status: "available" | "sold" | "reserved";
  price: string | null;
  floor: string | null;
  area: string | null;
  private_area: string | null;
  total_area: string | null;
  view: string | null;
  rooms: number | null;
  created_at?: string;
  updated_at?: string;
};

export type LocaleText = {
  ar: string;
  en: string;
};

export type Project = {
  id: number;
  title: LocaleText;
  description: LocaleText;
  price_from: string;
  city: LocaleText;
  area: string;
  rooms: string;
  unit_types: LocaleText;
  status: "available" | "sold" | "reserved";
  project_file_link: string; //  for the "Receive project file" button;
  project_phone_link: string; //  for the "Call us" button;
  project_questions_link: string; //  for the "Do you have any questions about the project?" button;
  features: LocaleText[];
  sold_percentage: number;
  gallery: string[];
  near_to: {
    img: string;
    locations: {
      name: LocaleText;
      distance: number;
    }[];
  };
  guarantees: {
    title: LocaleText;
    years: number;
  }[];
  diagrams: string[];
  units: Unit[];
  created_at: string;
  updated_at: string;
};

export type News = {
  id: number;
  title: LocaleText;
  description: LocaleText;
  content: LocaleText;
  image: string;
  created_at: string;
  updated_at: string;
};

export type City = {
  id: number;
  title_ar: string;
  title_en: string;
};

export type RegisterYourInterestPayload = {
  full_name: string;
  phone: string;
  payment_method: "cash" | "supported_bank" | "un_supported_bank";
  budget: string;
  city_id: number; // map over cities from guest/cities api
  property_type: "apartment" | "floors" | "penthouse" | "townhouse" | "villa";
  connection_method: Array<"whatsapp" | "call">; // displayed as check box so the user can check one or both
};
