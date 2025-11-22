import { Employee } from '../types/employee';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Mail, Phone, MapPin, Briefcase, User, Users } from 'lucide-react';
import { Separator } from './ui/separator';

interface UserProfileModalProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
  allEmployees: Employee[];
}

export function UserProfileModal({ employee, isOpen, onClose, allEmployees }: UserProfileModalProps) {
  if (!employee) return null;

  const getInitials = () => {
    return `${employee.firstName.charAt(0)}${employee.lastName.charAt(0)}`;
  };

  const manager = employee.managerId 
    ? allEmployees.find(emp => emp.id === employee.managerId)
    : null;

  const directReports = allEmployees.filter(emp => 
    employee.directReports.includes(emp.id)
  );

  const totalReports = employee.directReports.length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="dlg-content max-w-2xl max-h-[90vh] scrollbar-width-none overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        <DialogHeader>
          <DialogTitle className="text-2xl">Employee Profile</DialogTitle>
          <DialogDescription>
            View detailed information about {employee.firstName} {employee.lastName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage src={employee.profilePic} alt={`${employee.firstName} ${employee.lastName}`} />
              <AvatarFallback className="bg-blue-600 text-white text-2xl">
                {getInitials()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left space-y-2">
              <h2 className="text-3xl">
                {employee.firstName} {employee.lastName}
              </h2>
              <p className="text-blue-600 flex items-center justify-center sm:justify-start gap-2">
                <Briefcase className="w-5 h-5" />
                {employee.jobTitle}
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge variant="secondary" className="px-3 py-1">
                  {employee.department}
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  {employee.officeLocation}
                </Badge>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="text-blue-600">Contact Information</h3>
            <Separator />
            <div className="grid gap-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <a href={`mailto:${employee.email}`} className="text-blue-600 hover:underline">
                    {employee.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <a href={`tel:${employee.phone}`} className="text-blue-600 hover:underline">
                    {employee.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Office Location</p>
                  <p>{employee.officeLocation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Organizational Structure */}
          <div className="space-y-3">
            <h3 className="text-blue-600">Organizational Structure</h3>
            <Separator />
            
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Manager */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <p className="text-sm text-gray-600">Reports To</p>
                </div>
                {manager ? (
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={manager.profilePic} alt={`${manager.firstName} ${manager.lastName}`} />
                      <AvatarFallback className="bg-blue-600 text-white text-sm">
                        {manager.firstName.charAt(0)}{manager.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p>{manager.firstName} {manager.lastName}</p>
                      <p className="text-sm text-gray-600">{manager.jobTitle}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No direct manager</p>
                )}
              </div>

              {/* Direct Reports Count */}
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-gray-600">Direct Reports</p>
                </div>
                <p className="text-3xl text-green-600">{totalReports}</p>
                <p className="text-sm text-gray-600">
                  {totalReports === 1 ? 'person reports' : 'people report'} to {employee.firstName}
                </p>
              </div>
            </div>
          </div>

          {/* Direct Reports List */}
          {directReports.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-blue-600">Team Members</h3>
              <Separator />
              <div className="grid gap-2 max-h-64 overflow-y-auto">
                {directReports.map((report) => (
                  <div 
                    key={report.id} 
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={report.profilePic} alt={`${report.firstName} ${report.lastName}`} />
                      <AvatarFallback className="bg-blue-600 text-white">
                        {report.firstName.charAt(0)}{report.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="truncate">
                        {report.firstName} {report.lastName}
                      </p>
                      <p className="text-sm text-gray-600 truncate">{report.jobTitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}