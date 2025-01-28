import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import SearchForm from './components/SearchForm';
import TeacherCard from './components/TeacherCard';
import teacherData from './data/teacherData.json';
import { SearchFilters, TeacherDetails } from './types';

// Import the logo image
import logo from './images/LOGO_MYTUTOR.png';

function App() {
  const [searchResults, setSearchResults] = useState<TeacherDetails['teacher_details']>({});
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (filters: SearchFilters) => {
    const filteredTeachers = Object.entries(teacherData.teacher_details).reduce(
      (acc, [id, teacher]) => {
        const matchesCity = teacher.tuition_filter_details.city === filters.city;
        const matchesClasses = filters.classes.some(cls => 
          teacher.tuition_filter_details.classes.includes(cls)
        );
        const matchesStream = 
          teacher.tuition_filter_details.subject_details.stream === filters.stream;
        const matchesSubjects = filters.subjects.some(subject =>
          teacher.tuition_filter_details.subject_details.subjects.includes(subject)
        );

        if (matchesCity && matchesClasses && matchesStream && matchesSubjects) {
          acc[id] = teacher;
        }
        return acc;
      },
      {} as TeacherDetails['teacher_details']
    );

    setSearchResults(filteredTeachers);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center">
            {/* Replace the heading with the logo image */}
            <img src={logo} alt="MyTutor Logo" className="h-12" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <SearchForm onSearch={handleSearch} />

          {hasSearched && (
            <div className="mt-8 space-y-6">
              {Object.keys(searchResults).length > 0 ? (
                <>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Found {Object.keys(searchResults).length} matching tutors
                  </h2>
                  {Object.values(searchResults).map((teacher, index) => (
                    <TeacherCard key={index} teacher={teacher} />
                  ))}
                </>
              ) : (
                <div className="text-center py-8 px-4 rounded-lg bg-white shadow">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">No Tutors Found</h2>
                  <p className="text-gray-600">
                    No teachers match your search criteria. Try adjusting your filters.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;