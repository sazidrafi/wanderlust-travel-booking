//import React from 'react';

import Destination from "@/components/Destination";

const DesctinationsPage = async () => {
  const res = await fetch("http://localhost:5000/destination");
  const destinations = await res.json();
  //   console.log(users);
  return (
    <div className="container mx-auto m-10 mt-15">
      <h2 className="text-5xl">Explore All Destination</h2>
      <h2 className="text text-gray-500 mt-5 mb-10">
        Find your perfect travel experience from our curated collection
          </h2>

          <div className="grid grid-cols-3 gap-5">
              {
                  destinations.map(dest => (
                      <Destination key={dest._id} destination={ dest}>{ dest.destinationName}</Destination>
                  ))
              }
      </div>
    </div>
  );
};

export default DesctinationsPage;
