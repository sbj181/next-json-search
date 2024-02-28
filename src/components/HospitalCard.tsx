import React from 'react';
import { Hospital } from '../../types';

interface HospitalCardProps {
  hospital: Hospital;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital }) => {
  const handleSendEmail = () => {
    const recipient = 'recipient@example.com'; // Update with the recipient email address
    const subject = 'Production URL';
    const body = `Please find the production URL below:%0D%0A${hospital['Production URL']}`; // URL encoded

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };
  // Function to copy URL to clipboard
  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      // Optional: Display a message or change button text temporarily
      alert('URL copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2">
        <label className='text-xs block text-slate-400'>Date Live</label>
        <p className='text-sm block mb-3'>{hospital["Date of URL Request Form Submission"]}</p>
        <h3 className='text-xl font-bold leading-6 mb-3'>{hospital["ACCOUNT\\/IDN"]}</h3>
        <label className='text-xs block text-slate-400'>Address</label>
        <p>{hospital.Address}</p>
        <p>{hospital.City}, {hospital.State} {hospital.Zip}</p>
        <label className='mt-2 block text-xs text-slate-400'>Alliance Champion</label>
        <p className="text-sm mb-2">{hospital["Alliance Champion(s)"]}</p>
        <label className='mt-2 block text-xs text-slate-400'>URL</label>
        {hospital["Production URL"] && (
          <div>
            <div className='overflow-scroll h-10 bg-slate-100 p-1 rounded-s block mb-2'>
              <a className="text-sky-700 break-words block text-xs mb-2" href={hospital["Production URL"]} target='_blank'>{hospital["Production URL"]}</a>
            </div>
            <div className='flex justify-between'>
            <button 
              className="mt-2 px-4 py-2 bg-sky-700 text-white rounded hover:bg-sky-900 transition"
              onClick={() => copyToClipboard(hospital["Production URL"])}
            >
              Copy URL
            </button>
            <button onClick={handleSendEmail} className="border-2 border-sky-700 text-sky-700 hover:bg-sky-700 hover:text-sky-100 transition px-4 py-2 rounded-md mt-2 ml-2">
              Send URL 
            </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default HospitalCard;
