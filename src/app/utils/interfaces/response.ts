export interface Response<T> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
}
