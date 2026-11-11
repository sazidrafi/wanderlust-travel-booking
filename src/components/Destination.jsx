import Image from "next/image";
import { Card, Button } from "@heroui/react";
import { MapPin, CalendarDays, ArrowUpRight, Star } from "lucide-react";
import Link from "next/link";

const Destination = ({ destination }) => {
  const { _id, destinationName, country, price, duration, imageUrl, rating } =
    destination;

  return (
    <div className="w-full min-w-sm md:w-120 overflow-hidden bg-white shadow-sm">
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={destinationName}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Rating */}
        {rating && (
          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-md bg-white px-3 py-2 shadow-md">
            <span className="font-semibold text-black">{rating}</span>
            <Star size={17} fill="currentColor" className="text-black" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3 p-4">
        {/* Country */}
        <div className="flex items-center gap-2 text-default-500">
          <MapPin size={18} />
          <span className="text-sm">{country}</span>
        </div>

        {/* Name and Price */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-semibold text-default-900">
            {destinationName}
          </h2>

          <p className="shrink-0 text-lg font-semibold text-default-900">
            ৳{Number(price).toLocaleString("en-US")}
            <span className="text-xs font-normal text-default-500">
              /Person
            </span>
          </p>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2 text-default-500">
          <CalendarDays size={18} />
          <span className="text-sm">{duration}</span>
        </div>

        {/* Button */}
        <div className="pt-2">
          <Link href={`/destinations/${destination._id}`}>
            <Button
              as="a"
              variant="light"
              color="primary"
              className="px-0 font-semibold hover:text-blue-400"
            >
              BOOK NOW
              <ArrowUpRight size={19} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Destination;
