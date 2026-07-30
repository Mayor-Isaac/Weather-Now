import { useQuery } from '@tanstack/react-query';
import React from 'react'

export default function Search({ queryCity, setQueryCity }) {
         const { isPending, error, data } = useQuery({
           queryKey: [queryCity],
           queryFn: () =>
             fetch(
               `https://geocoding-api.open-meteo.com/v1/search?name=${queryCity}`,
             ).then((res) => res.json()),
         });

        //  if (isPending) return "Loading...";

        //  if (error) return "An error has occurred: " + error.message;

    //      console.log(data);
    // console.log("Searching for:", queryCity);
    
    const handleSearch = () => {};
  return (
    <div className="flex flex-col gap-5 relative">
      <div className="py-4 px-8 flex items-center gap-6 rounded-[10px] bg-[#272541]">
        <img src="/icon-search.svg" alt="Search" className="w-8 h-8" />
        <input
          type="text"
          placeholder="Search for a place..."
          value={queryCity}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          onChange={(e) => {
            setQueryCity(e.target.value);
          }}
          className="bg-transparent border-none flex-1 focus:outline-none"
        />
      </div>

      <button
        className="rounded-[10px] bg-[#4455da] p-5 cursor-pointer text-3xl text-center "
        onClick={handleSearch}
      >
        Search
      </button>

      <div className="absolute top-full mt-4 left-0 bg-[#272541] shadow-lg rounded-xl w-[90%] z-10">
      {data && data.results && data.results.length > 0 ? (
          <ul className="flex flex-col gap-2 p-2">
            {data.results.map((result) => (
              <li
                key={result.id}
                className="py-2 px-4 cursor-pointer hover:bg-[#3d3b5e] rounded-xl"
              >
                {result.name}, {result.country}
              </li>
            ))}
          </ul>
      ) : null}
          </div>
          
    </div>
  );
}
