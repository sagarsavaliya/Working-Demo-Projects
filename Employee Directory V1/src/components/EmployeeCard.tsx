import { Employee } from '../types/employee';
import { Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { motion } from 'motion/react';

interface EmployeeCardProps {
  employee: Employee;
  onClick: () => void;
}

export function EmployeeCard({ employee, onClick }: EmployeeCardProps) {
  const getInitials = () => {
    return `${employee.firstName.charAt(0)}${employee.lastName.charAt(0)}`;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white border border-gray-200"
        onClick={onClick}
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <Avatar className="w-24 h-24 border-4 border-blue-100">
            <AvatarImage src={employee.profilePic} alt={`${employee.firstName} ${employee.lastName}`} />
            <AvatarFallback className="bg-blue-600 text-white">
              {getInitials()}
            </AvatarFallback>
          </Avatar>

          <div className="w-full space-y-2">
            <h3 className="truncate">
              {employee.firstName} {employee.lastName}
            </h3>
            
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <Briefcase className="w-4 h-4 flex-shrink-0" />
              <p className="truncate text-sm">{employee.jobTitle}</p>
            </div>

            <div className="pt-2 border-t border-gray-100 space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <p className="truncate text-sm">{employee.department}</p>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <p className="truncate text-sm">{employee.officeLocation}</p>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <p className="truncate text-sm">{employee.email}</p>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <p className="truncate text-sm">{employee.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
