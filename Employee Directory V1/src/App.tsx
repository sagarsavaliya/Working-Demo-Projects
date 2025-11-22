import { useState, useMemo } from 'react';
import { employees } from './data/employees';
import { Employee } from './types/employee';
import { EmployeeCard } from './components/EmployeeCard';
import { UserProfileModal } from './components/UserProfileModal';
import { Input } from './components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './components/ui/button';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobTitle, setSelectedJobTitle] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get unique values for filters
  const jobTitles = useMemo(() => {
    const titles = new Set(employees.map(emp => emp.jobTitle));
    return Array.from(titles).sort();
  }, []);

  const departments = useMemo(() => {
    const depts = new Set(employees.map(emp => emp.department));
    return Array.from(depts).sort();
  }, []);

  const locations = useMemo(() => {
    const locs = new Set(employees.map(emp => emp.officeLocation));
    return Array.from(locs).sort();
  }, []);

  // Cascading filter logic
  const availableJobTitles = useMemo(() => {
    let filtered = employees;
    
    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(emp => emp.department === selectedDepartment);
    }
    
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(emp => emp.officeLocation === selectedLocation);
    }
    
    const titles = new Set(filtered.map(emp => emp.jobTitle));
    return Array.from(titles).sort();
  }, [selectedDepartment, selectedLocation]);

  const availableDepartments = useMemo(() => {
    let filtered = employees;
    
    if (selectedJobTitle !== 'all') {
      filtered = filtered.filter(emp => emp.jobTitle === selectedJobTitle);
    }
    
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(emp => emp.officeLocation === selectedLocation);
    }
    
    const depts = new Set(filtered.map(emp => emp.department));
    return Array.from(depts).sort();
  }, [selectedJobTitle, selectedLocation]);

  const availableLocations = useMemo(() => {
    let filtered = employees;
    
    if (selectedJobTitle !== 'all') {
      filtered = filtered.filter(emp => emp.jobTitle === selectedJobTitle);
    }
    
    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(emp => emp.department === selectedDepartment);
    }
    
    const locs = new Set(filtered.map(emp => emp.officeLocation));
    return Array.from(locs).sort();
  }, [selectedJobTitle, selectedDepartment]);

  // Filter employees based on search and filters
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesSearch = searchQuery === '' || 
        `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesJobTitle = selectedJobTitle === 'all' || employee.jobTitle === selectedJobTitle;
      const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
      const matchesLocation = selectedLocation === 'all' || employee.officeLocation === selectedLocation;

      return matchesSearch && matchesJobTitle && matchesDepartment && matchesLocation;
    });
  }, [searchQuery, selectedJobTitle, selectedDepartment, selectedLocation]);

  const handleCardClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedJobTitle('all');
    setSelectedDepartment('all');
    setSelectedLocation('all');
  };

  const hasActiveFilters = searchQuery !== '' || selectedJobTitle !== 'all' || 
                          selectedDepartment !== 'all' || selectedLocation !== 'all';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by name, job title, department, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-12 text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Job Title</label>
              <Select value={selectedJobTitle} onValueChange={setSelectedJobTitle}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="All Job Titles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Job Titles</SelectItem>
                  {availableJobTitles.map(title => (
                    <SelectItem key={title} value={title}>{title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Department</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {availableDepartments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Office Location</label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {availableLocations.map(loc => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="flex justify-center pt-2">
              <Button 
                variant="outline" 
                onClick={handleClearFilters}
                className="gap-2"
              >
                <X className="w-4 h-4" />
                Clear All Filters
              </Button>
            </div>
          )}

          {/* Results Count */}
          <div className="text-center text-gray-600">
            Showing <span className="text-blue-600">{filteredEmployees.length}</span> of {employees.length} employees
          </div>
        </div>

        {/* Employee Grid */}
        <div className="mt-8">
          {filteredEmployees.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredEmployees.map(employee => (
                  <EmployeeCard
                    key={employee.id}
                    employee={employee}
                    onClick={() => handleCardClick(employee)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-gray-600 mb-2">No employees found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* User Profile Modal */}
      <UserProfileModal
        employee={selectedEmployee}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        allEmployees={employees}
      />
    </div>
  );
}
