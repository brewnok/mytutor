import React from 'react';
import { MapPin, Phone } from 'lucide-react';

interface TeacherCardProps {
  teacher: {
    personalDetails: {
      name: string;
      phone: string;
      address: string;
      qualification: string;
    };
    tuition_filter_details: {
      classes: string[];
      subject_details: {
        stream: string;
        subjects: string[];
      };
      image_path: string;
      city: string;
      google_map: {
        qlink: string;
      };
    };
  };
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-48 md:flex-shrink-0">
          <img
            className="w-full h-48 object-cover"
            src={teacher.tuition_filter_details.image_path}
            alt={teacher.personalDetails.name}
          />
        </div>
        <div className="p-6 flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {teacher.personalDetails.name}
              </h3>
              <p className="mt-1 text-gray-600">{teacher.personalDetails.qualification}</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <a
                href={teacher.tuition_filter_details.google_map.qlink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <MapPin size={16} className="mr-1" />
                Map
              </a>
              <a
                href={`tel:${teacher.personalDetails.phone}`}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Phone size={16} className="mr-1" />
                Call
              </a>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Contact</h4>
              <p className="mt-1 text-sm text-gray-900 flex items-center">
                <Phone size={16} className="mr-1" />
                {teacher.personalDetails.phone}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Location</h4>
              <p className="mt-1 text-sm text-gray-900">
                {teacher.personalDetails.address}, {teacher.tuition_filter_details.city}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-500">Classes</h4>
            <div className="mt-1 flex flex-wrap gap-2">
              {teacher.tuition_filter_details.classes.map((cls) => (
                <span
                  key={cls}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {cls}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-500">Subjects</h4>
            <div className="mt-1 flex flex-wrap gap-2">
              {teacher.tuition_filter_details.subject_details.subjects.map((subject) => (
                <span
                  key={subject}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}