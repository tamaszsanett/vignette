// type API response
export type ApiResponse = {
  value: any;
  isSuccess: boolean;
  error: ApiError;
  isFailure: boolean;
};

// type error
export type ApiError = {
  code: string;
  message: string;
};

// type form errors
export type FormErrors = {
  email: string;
  plateNumber: string;
  terms: string;
  apiError: string;
};
