//import React from 'react';

import { Button, Chip } from "@heroui/react";
import Image from "next/image";
import { FiDollarSign } from "react-icons/fi";
import { MdDeleteForever, MdRemoveRedEye } from "react-icons/md";
import { BookingCancelAlert } from "./BookingCancelAlert";

const MyBookingsCard = ({ data }) => {
  const {
    _id,
    userId,
    userName,
    userImage,
    userEmail,
    destinationId,
    destinationName,
    bookingDate,
    destinationPricce,
    destinationImage,
    destinationCountry,
  } = data;
  //   console.log(data)
  const formattedDate = new Date(bookingDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const useId = userId.slice(0, 2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center border p-4">
      {/* Image */}
      <div className="md:col-span-5">
  <Image
    src={destinationImage}
    alt={destinationName || "Destination image"}
    width={400}
    height={200}
    style={{
      width: "100%",
      height: "400px",
      objectFit: "contain",
    }}
  />
</div>

      {/* Booking Information */}
      <div className="md:col-span-4 space-y-4">
        <Chip color="success" className="text-2xl p-2 mb-6 bg-green-200">
          Confirmed
        </Chip>

        <h1 className="text-5xl font-semibold">{destinationName}</h1>

        <p className="text-2xl text-gray-600">Departure: {formattedDate}</p>
        <p className="text-2xl text-gray-600">Booking ID: {useId}</p>
        <div className="flex">
          <FiDollarSign className="text-4xl text-blue-500 "/>
          <p className="text-5xl font-semibold text-blue-500">
            {destinationPricce}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="md:col-span-3 flex items-end justify-end h-full gap-3">
        <Button variant="tertiary" className="text-3xl p-6">
          <MdRemoveRedEye className="w-7! h-7! shrink-0"/>View{" "}
        </Button>
        <BookingCancelAlert bookingId={_id}/>
      </div>
    </div>
  );
};

export default MyBookingsCard;
