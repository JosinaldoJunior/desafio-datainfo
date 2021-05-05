export interface User {
    id?: number;
    name: string;
    email: string;
    password?: string;
    readonly created_at?: { date: string};
    readonly updated_at?: { date: string};
}

export interface Task {
  id?: number;
  name: string;
  completed: boolean;
  readonly created_at?: {date: string};
  readonly updated_at?: {date: string};
}
