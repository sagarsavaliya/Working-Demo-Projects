export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  department: string;
  officeLocation: string;
  email: string;
  phone: string;
  profilePic: string;
  managerId?: string;
  directReports: string[];
}
