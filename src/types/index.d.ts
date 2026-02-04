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
  phone: string;
  dialing_code: number;
  verified_at: string | nulL;
  country: {
    id: number,
    code: string,
    title: string
  },
  loyalty_points: number,
  loyalty_points_history: Array<{
    id: number;
    points: number;
    order: {
      id: number;
      status: "paid" | "unpaid";
      total: string;
      subtotal: string;
      coupon: string | null;
      coupon_type: string | null;
      coupon_value: string | null;
      name: string;
      city: string;
      address: string | null;
      neighborhood: string;
      detailed_address: string;
      email: string;
      phone_1: string;
      phone_2: string;
      notes: string;
      flat_number: string;
      items: Array<{
        id: number;
        product: Product;
        product_name: string;
        quantity: string;
        price: string;
      }>;
      created_at: string;
      updated_at: string;
    };
    created_at: string;
    updated_at: string;
  }> | [];
  verified_at: string | null,
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
  status: "success" | "error"
  result: {
    data: T;
    meta?: Meta
  };
  message: string
};
