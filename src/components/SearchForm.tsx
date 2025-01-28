import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import formOptions from '../data/formOptions.json';
import { FormOptions, SearchFilters } from '../types';

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedStream, setSelectedStream] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([]);

  const options = formOptions as FormOptions;

  useEffect(() => {
    if (selectedStream) {
      setAvailableSubjects(options.stream[selectedStream] || []);
      setSelectedSubjects([]);
    }
  }, [selectedStream]);

  const handleSearch = () => {
    onSearch({
      city: selectedCity,
      classes: selectedClasses,
      stream: selectedStream,
      subjects: selectedSubjects,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Your Perfect Tutor</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Location</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a city</option>
            {options.city.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Choose Classes</label>
          <div className="grid grid-cols-2 gap-2">
            {options.class.map((cls) => (
              <label key={cls} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedClasses.includes(cls)}
                  onChange={(e) => {
                    setSelectedClasses(
                      e.target.checked
                        ? [...selectedClasses, cls]
                        : selectedClasses.filter((c) => c !== cls)
                    );
                  }}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>{cls}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Stream</label>
          <select
            value={selectedStream}
            onChange={(e) => setSelectedStream(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a stream</option>
            {Object.keys(options.stream).map((stream) => (
              <option key={stream} value={stream}>
                {stream}
              </option>
            ))}
          </select>
        </div>

        {selectedStream && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Subjects</label>
            <div className="grid grid-cols-2 gap-2">
              {availableSubjects.map((subject) => (
                <label key={subject} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedSubjects.includes(subject)}
                    onChange={(e) => {
                      setSelectedSubjects(
                        e.target.checked
                          ? [...selectedSubjects, subject]
                          : selectedSubjects.filter((s) => s !== subject)
                      );
                    }}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>{subject}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleSearch}
          disabled={!selectedCity || selectedClasses.length === 0 || !selectedStream || selectedSubjects.length === 0}
          className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Search size={20} />
          <span>Search Tutors</span>
        </button>
      </div>
    </div>
  );
}