import React, { useState } from 'react';

interface Props {
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

const MultiSelectDropdown: React.FC<Props> = ({ options, selectedOptions, setSelectedOptions }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const selectAllOptions = () => {
    setSelectedOptions(options);
  };

  const clearSelection = () => {
    setSelectedOptions([]);
  };

   // Sort options alphabetically
   options.sort((a, b) => a.localeCompare(b));

   //flip chevron
   const chevronClass = isOpen ? 'transform rotate-180' : '';

  return (
    <div className="relative inline-block text-left min-w-[200px]"> {/* Added min-width */}
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex border-2 justify-around w-full px-4 py-3 text-sm font-medium leading-5 text-gray-700 bg-white border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
          >
            <span className="block truncate">
              {selectedOptions.length === 0 ? 'Select State(s)' : selectedOptions.join(', ')}
            </span>
            <svg
              className={`-mr-1 ml-2 h-5 w-5 ${chevronClass}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 12.414l6.293-6.293a1 1 0 011.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 111.414-1.414L10 12.414z"
              />
            </svg>
          </button>
        </span>
      </div>

      {isOpen && (
        <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
          <ul
            tabIndex={-1} // Corrected tabIndex to use numeric value
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-item-3"
            className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
          >
            <li
              onClick={selectAllOptions}
              className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <span className="block truncate text-sky-700 font-semibold">Select All</span>
              </div>
            </li>
            <li
              onClick={clearSelection}
              className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <span className="block truncate text-sky-700 font-semibold">Clear Selection</span>
              </div>
            </li>
            {options.map((option) => (
              <li
                key={option}
                onClick={() => toggleOption(option)}
                className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <span
                    className={`${
                      selectedOptions.includes(option) ? 'font-bold text-sky-700' : 'font-normal'
                    } block truncate`}
                  >
                    {option}
                  </span>
                </div>
                {selectedOptions.includes(option) && (
                  <span
                    className="absolute inset-y-0 right-0 flex items-center pr-4"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414L11.414 11l2.293 2.293a1 1 0 01-1.414 1.414L10 12.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 11 6.293 8.707a1 1 0 010-1.414z"
                      />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
