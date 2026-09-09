// Department Interfaces
export interface ICreateDepartmentPayload {
  name: string;
  code: string;
  description?: string;
}

export interface IUpdateDepartmentPayload extends Partial<ICreateDepartmentPayload> {}

// Position Interfaces
export interface ICreatePositionPayload {
  title: string;
  name:string;
}

export interface IUpdatePositionPayload extends Partial<ICreatePositionPayload> {}