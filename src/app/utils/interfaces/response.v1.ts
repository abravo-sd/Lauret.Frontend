export interface ResponseV1<T> {
  id?: number;
  exito?: boolean;
  mensaje?: string;
  input?: string;
  output: T[];
}
