import React from 'react'
import { useEffect } from 'react';
import Search from '../components/Search';
import Data from '../components/Data';



export default function Main({ tempUnit, windSpeedUnit, precipitationUnit }) {
  const [queryCity, setQueryCity] = React.useState("");
   const [queryCoords, setQueryCoords] = React.useState([0, 0]);

  useEffect(() => {
     if ("geolocation" in navigator) {
       navigator.geolocation.getCurrentPosition(
         (position) => {
           const { latitude, longitude } = position.coords;
           setQueryCoords([latitude, longitude]);
         },
         (error) => console.error("Error:", error.message),
       );
     } else {
       console.log("Geolocation not supported");
     } 
  }, []);

 

  return (
    <main className="flex flex-col gap-5">
          <Search queryCity={queryCity} setQueryCity={setQueryCity} />
          <Data queryCoords={queryCoords ? queryCoords : [0, 0]} tempUnit={tempUnit} windSpeedUnit={windSpeedUnit} precipitationUnit={precipitationUnit} />
    </main>
  );
}
