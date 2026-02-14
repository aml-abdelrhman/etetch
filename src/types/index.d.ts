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
