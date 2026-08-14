export interface SimpleContainerResponse {
  Id: string;
  Names: string[];
  Image: string;
  State: string;
  Status: string;
  Ports: {
    PrivatePort: number;
    PublicPort?: number;
    Type: string;
  }[];
}
