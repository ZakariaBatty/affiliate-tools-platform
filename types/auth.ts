import { User } from '.';

export interface Session {
   user: {
      id: string;
      name: string | null;
      email: string;
      image: string | null;
      role: string;
   };
   expires: string;
}

export interface SignInFormData {
   email: string;
   password: string;
}

export interface SignUpFormData {
   name: string;
   email: string;
   password: string;
   confirmPassword: string;
   role?: 'USER' | 'COMPANY';
}

export interface ResetPasswordFormData {
   email: string;
}

export interface NewPasswordFormData {
   password: string;
   confirmPassword: string;
   token: string;
}

export interface AuthState {
   user: User | null;
   isLoading: boolean;
   error: string | null;
}
