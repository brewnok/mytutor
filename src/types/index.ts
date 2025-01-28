export interface FormOptions {
  city: string[];
  class: string[];
  stream: {
    [key: string]: string[];
  };
}

export interface TeacherDetails {
  teacher_details: {
    [key: string]: {
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
  };
}

export interface SearchFilters {
  city: string;
  classes: string[];
  stream: string;
  subjects: string[];
}