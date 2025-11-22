export interface User {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  parentId: string | null;
  children: User[];
  // Layout properties
  x: number;
  y: number;
  width: number;
  height: number;
  layoutStyle?: 'horizontal' | 'vertical';
  // State
  isExpanded: boolean;
  color: string;
}

export interface OrgData {
  root: User;
}
