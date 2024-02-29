import { useState, useEffect } from 'react';
import HospitalCard from '../components/HospitalCard';
import HospitalRowItem from '../components/HospitalRowItem'; 
import MultiSelectDropdown from '../components/MultiSelectDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faTh } from '@fortawesome/free-solid-svg-icons';
import hospitalsData from '../../public/hospitals_CORRECT.json';
import '../app/globals.css';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStates, setSelectedStates] = useState<string[]>([]); // Specify the type as string[]
  const [uniqueStates, setUniqueStates] = useState<string[]>([]); // Specify the type as string[]
  const [isGridMode, setIsGridMode] = useState(true); // State variable for tracking layout mode
  const [isScrolled, setIsScrolled] = useState(false);


  useEffect(() => {
    const states: string[] = Array.from(new Set(hospitalsData["Clinic Links Copay_FTO"].map(hospital => hospital.State)));
    setUniqueStates(states);
  }, []);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 0);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredHospitals = hospitalsData["Clinic Links Copay_FTO"].filter(
    (hospital) =>
      (hospital["ACCOUNT\/IDN"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.Address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.City?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital["Alliance Champion(s)"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.State?.toString().includes(searchTerm.toLowerCase()) ||
      hospital.Zip?.toString().includes(searchTerm)) &&
    (selectedStates.length === 0 || selectedStates.includes(hospital.State))
  );

  const toggleLayoutMode = () => {
    setIsGridMode(!isGridMode); // Toggle between grid and row/list layouts
  };

  return (
    <div className="p-4 pt-40">
     <div className={`toparea fixed top-0 bg-slate-100 left-0 w-full p-4 z-10 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className='titlewrap'>
        <h1 className='text-4xl dark:text-slate-100 font-bold mb-3 text-center'>Hospital Search</h1>
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
        <button className=' bg-slate-700 text-slate-100 transition hover:bg-slate-900 rounded-md px-4 py-3' onClick={toggleLayoutMode}>
          {isGridMode ? <FontAwesomeIcon icon={faList} /> : <FontAwesomeIcon icon={faTh} />}
        </button>
      </div>
      </div>
      <div className={`hospital-list ${isGridMode ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4' : 'flex flex-col'}`}>
        {filteredHospitals.map((hospital, index) => (
          isGridMode ? (
            <HospitalCard key={index} hospital={hospital} />
          ) : (
            <HospitalRowItem key={index} hospital={hospital} index={index} />
          )
        ))}
      </div>
    </div>
  );
}
