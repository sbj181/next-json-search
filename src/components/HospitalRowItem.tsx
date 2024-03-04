import React from 'react';


// Define the interface for the props
interface HospitalRowItemProps {
    hospital: any; // Adjust the type as per your hospital object structure
    index: number; // Ensure index is of type number
  }
  
  // Use the props interface in the component function
  const HospitalRowItem: React.FC<HospitalRowItemProps> = ({ hospital, index }) => {
    // Determine the background color based on the index
    const bgColor = index % 2 === 0 ? 'bg-slate-300 dark:bg-slate-100 shadow-sm mb-2 rounded-sm' : 'bg-slate-200 dark:bg-slate-800 shadow-sm mb-2 rounded-sm';
  
  // Display "None" if "Alliance Champion(s)" is falsy
  const allianceChampion = hospital["Alliance Champion(s)"] || 'None';


  return (
    <div className={`shadow-md p-4 mx-2 ${bgColor}`}>
      <div>
        <h3 className='text-xl font-bold leading-6 mb-3'>{hospital["ACCOUNT\/IDN"]}</h3>
      </div>

      <div className='flex gap-4 flex-col md:flex-row justify-between align-top'>
        <div className='flex-1'>
          <div className='text-xs block text-slate-400'>Address</div>
          <div>{hospital.Address}</div>
          <div>{hospital.City}, {hospital.State} {hospital.Zip}</div>
        </div>

        <div className='flex-1'>
          <div className='text-xs block text-slate-400'>Date Live</div>
          <div className='text-sm block mb-3'>{hospital["Date of URL Request Form Submission"]}</div>
        </div>

        <div className='flex-1'>
          <div className='block text-xs text-slate-400'>Alliance Champion</div>
          <div className="text-sm mb-2">{allianceChampion}</div>
        </div>

        <div className='flex-1 md:w-3.5'>
          <div className='text-xs block text-slate-400'>URL</div>
          {hospital["Production URL"] ? (
            <div className='overflow-scroll h-10 dark:bg-slate-800 bg-slate-100 p-1 rounded-s block mb-2'>
              <a className="text-sky-700 break-words block text-xs mb-2" href={hospital["Production URL"]} target='_blank'>{hospital["Production URL"]}</a>
            </div>
          ) : (
            <div className='text-sm'>No URL Found</div>
          )}
        </div>

         {/* Conditionally render Actions section and label */}
      {hospital["Production URL"] && (
        <>
          
          <div className='flex-1 flex flex-col'>
          <div className='block text-xs text-slate-400'>Actions</div>
            <div>
                <button className="px-4 py-2 bg-sky-700 text-white rounded hover:bg-sky-900 transition">
                Copy URL
                </button>
                <button className="border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-sky-100 transition px-4 py-2 rounded-md lg:ml-2">
                Send URL
                </button>
            </div>
          </div>
        </>
      )}
      </div>

     
    </div>
  );
};

export default HospitalRowItem;
