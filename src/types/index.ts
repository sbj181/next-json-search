export interface Hospital {
  "Date of URL Request Form Submission": string;
  "Address": string;
  "City": string;
  "State": string;
  "Zip": number;
  "ACCOUNT\\/IDN": string;
  "Request Form Completed / Approved": string;
  "Alliance Champion(s)": string;
  "Source Code / Card Type": string;
  "Production URL"?: string; // Optional since it might not be present in all entries
  "Live Date"?: string; // Optional since it might not be present in all entries
}

// If your JSON structure has a top-level key that contains the array of hospitals:
export interface HospitalData {
  "Clinic Links Copay_FTO": Hospital[];
}
