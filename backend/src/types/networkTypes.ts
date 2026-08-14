export interface NetworkResponse {
  iface: string;
  bytesDownPS: number | null;
  bytesUpPS: number | null;
  bytesDownSinceBoot: number;
  bytesUpSinceBoot: number;
}
