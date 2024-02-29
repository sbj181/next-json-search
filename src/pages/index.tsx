import { useState, useEffect } from 'react';
import HospitalCard from '../components/HospitalCard';
import MultiSelectDropdown from '../components/MultiSelectDropdown';
import hospitalsData from '../../public/hospitals.json';
import '../app/globals.css';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStates, setSelectedStates] = useState<string[]>([]); // Specify the type as string[]
  const [uniqueStates, setUniqueStates] = useState<string[]>([]); // Specify the type as string[]

  useEffect(() => {
    const states: string[] = Array.from(new Set(hospitalsData["Clinic Links"].map(hospital => hospital.State)));
    setUniqueStates(states);
  }, []);

  const filteredHospitals = hospitalsData["Clinic Links"].filter(
    (hospital) =>
      (hospital["ACCOUNT\\/IDN"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.Address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.City?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital["Alliance Champion(s)"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.State?.toString().includes(searchTerm.toLowerCase()) ||
      hospital.Zip?.toString().includes(searchTerm)) &&
    (selectedStates.length === 0 || selectedStates.includes(hospital.State))
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
        <MultiSelectDropdown
          options={Array.from(uniqueStates)}
          selectedOptions={selectedStates}
          setSelectedOptions={setSelectedStates}
        />
      </div>
      <div className="hospital-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredHospitals.map((hospital, index) => (
          <HospitalCard key={index} hospital={hospital} />
        ))}
      </div>
    </div>
  );
}
