const API_BASE_URL = "https://frontend-test-api.yoldi.agency/api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface LoginResponse {
  value: string;
}

export interface UserResponse {
  name: string;
  email: string;
  slug: string;
  image: string | null;
  cover: string | null;
  description: string | null;
}

export interface ApiError {
  message: string;
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    throw new Error((data as ApiError).message || "Произошла ошибка");
  }

  return data as T;
}

export async function login(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return handleResponse<LoginResponse>(response);
}

export async function register(
  credentials: RegisterCredentials
): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return handleResponse<LoginResponse>(response);
}

export async function getUser(token: string): Promise<UserResponse> {
  const response = await fetch(`${API_BASE_URL}/profile`, {
    headers: {
      "X-API-KEY": token,
    },
  });

  return handleResponse<UserResponse>(response);
}

export interface RegisterResponse {
  success: true;
  token: string;
}

export async function registerUser(credentials: RegisterCredentials): Promise<RegisterResponse> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return handleResponse<RegisterResponse>(response);
}

export async function getUsers(token: string): Promise<UserResponse[]> {
  const response = await fetch(`${API_BASE_URL}/user`, {
    headers: {
      "X-API-KEY": token,
    },
  });

  return handleResponse<UserResponse[]>(response);
}
