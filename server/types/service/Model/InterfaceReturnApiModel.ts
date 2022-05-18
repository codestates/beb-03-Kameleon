interface returnApi {
  success: boolean;
  data: object | null | any;
  error?: string | null;
  message?: string;
  redirectUri?: string;
}
export type { returnApi };
