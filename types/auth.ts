export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: string;
  has_agreed_to_terms: boolean;
  county: {
    id: number | null;
    name: string | null;
    project: string | null;
  } | null;
  subcounty: {
    id: number | null;
    name: string | null;
  } | null;
  ward: {
    id: number | null;
    name: string | null;
  } | null;
  fpo: {
    id: number | null;
    name: string | null;
  } | null;
  profile?: {
    role: number | string;
    county: string | null;
    county_id: number | null;
    subcounty_id: number | null;
    ward_id: number | null;
    subcounty: string | null;
    ward: string | null;
    id_number?: string;
    mobile_number?: string;
    is_active?: boolean;
    is_staff?: boolean;
    is_deactivated?: boolean;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: any;
  sessionStart: number | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token?: string;
  access?: string;
  refresh?: string;
  access_token?: string;
  refresh_token?: string;
  key?: string;
  auth_token?: string;
  data?: {
    token?: string;
    access?: string;
    access_token?: string;
    user?: User;
  };
}

export interface RefreshTokenResponse {
  access?: string;
  refresh?: string;
  access_token?: string;
  refresh_token?: string;
}
