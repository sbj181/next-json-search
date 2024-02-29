export interface Hospital {
    "Date of URL Request Form Submission"?: string;
    "Address"?: string;
    "City"?: string;
    "State"?: string;
    "Zip"?: string | number;
    "ACCOUNT\/IDN"?: string;
    "Request Form Completed / Approved"?: string;
    "Alliance Champion(s)"?: string | undefined;
    "Source Code / Card Type"?: string;
    "Production URL"?: string; // Optional since it might not be present in all entries
    "Live Date"?: string | number; // Allow for both string and number types
  }
  
  // If your JSON structure has a top-level key that contains the array of hospitals:
  export interface HospitalData {
    "Clinic Links Copay_FTO": Hospital[];
  }
  