import { useState, useEffect } from 'react';
import HospitalCard from '../components/HospitalCard';
import hospitalsData from '../../public/hospitals.json'; // Adjust the import if your JSON is not static
import '../app/globals.css';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [uniqueStates, setUniqueStates] = useState([]);

  // Extract unique states from your dataset
  useEffect(() => {
    const states = new Set(hospitalsData["Clinic Links"].map(hospital => hospital.State));
    setUniqueStates([...states]);
  }, []);

  // Filter hospitals based on search term and selected state
  const filteredHospitals = hospitalsData["Clinic Links"].filter(
    (hospital) =>
      (hospital["ACCOUNT\\/IDN"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.City?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital["Alliance Champion(s)"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.State?.toString().includes(searchTerm.toLowerCase()) ||
      hospital.Zip?.toString().includes(searchTerm)) && // Convert Zip to string and include in search
    (selectedState ? hospital.State === selectedState : true) // Filter by state if one is selected
);

  return (
    <div className="p-4">
      <div className='titlewrap'>
        <h1 className='text-4xl font-bold mb-3 text-center'>JSON Search</h1>
      </div>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name, city, state, or zip..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
        />
        <select
          className="p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="">Select a State</option>
          {uniqueStates.sort().map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      <div className="hospital-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredHospitals.map((hospital, index) => (
          <HospitalCard key={index} hospital={hospital} /> // Use index as key for lack of unique identifier
        ))}
      </div>
    </div>
  );
}
