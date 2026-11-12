import { AlertDialog, Button } from "@heroui/react";
import { Fullscreen, MapPin } from "lucide-react";
import Image from "next/image";
// import { Button } from "@heroui/react";
import { IoArrowBackSharp } from "react-icons/io5";
import { name } from "next/dist/server/ci-info";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaCheck,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";
import Link from "next/link";
import { EditModal } from "@/components/EditModal";
import DeleteModal from "@/components/DeleteModal";
import BookingCard from "@/components/BookingCard";

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;
  //   console.log(id);

  const res = await fetch(`http://localhost:5000/destination/${id}`);
  const destination = await res.json();
  //   console.log(destination);
  const {
    _id,
    destinationName,
    description,
    country,
    price,
    duration,
    imageUrl,
    departureDate,
  } = destination;

  const formattedDate = departureDate
    ? new Date(departureDate).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
    : "";
  return (
    <div className="container mx-auto m-5 p-1 ">
      <div className="mb-10 mt-10 flex justify-between">
        <Link href="/destinations">
          <button className="cursor-pointer" color="default">
            <h2 className="flex text-gray-500 gap-4 items-center text-2xl">
              <IoArrowBackSharp size={30} />
              Back to destinations
            </h2>
          </button>
        </Link>

        <div className="flex gap-3">
          <EditModal destination={destination} />
          <DeleteModal destinationName={destinationName} id={_id} />
        </div>
      </div>
      <Image
        alt={destinationName}
        src={imageUrl}
        height={600}
        width={1600}
        className="mb-10 pb-10 border-b-2 w-full h-62.5 md:h-100 lg:h-200 object-cover"
      />

      {/* information section */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Destination Information */}
          <div className="lg:col-span-2 space-y-10">
            {/* Header */}
            <div className="space-y-4">
              <p className="flex items-center gap-2 text-default-500">
                <FaMapMarkerAlt />
                {country}
              </p>

              <h1 className="text-4xl md:text-5xl font-serif text-default-900">
                {destinationName}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-default-600">
                {/* <div className="flex items-center gap-2">
                <FaStar className="text-success" />
                <span className="font-semibold text-default-900">
                  {rating}
                </span>
              </div> */}

                <div className="flex items-center gap-2">
                  <FaCalendarAlt />
                  <span className="font-medium text-default-900">
                    {duration}
                  </span>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-serif">Overview</h2>

              <p className="text-default-500 leading-relaxed">{description}</p>
            </div>
          </div>

          {/* Booking Card */}
          <BookingCard destination={destination}/>
        </div>
      </section>
    </div>
  );
};

export default DestinationDetailsPage;
