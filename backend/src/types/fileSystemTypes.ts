// file or dir
export interface FSObject {
  name: string;
  type: "FILE" | "DIR";
  fullPath: string;
  children?: FSObject[];
}
