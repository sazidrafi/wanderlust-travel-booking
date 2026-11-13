"use client";
import { Plus } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { Calendar, DateField, DatePicker, Label } from "@heroui/react";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const BookingCard = ({ destination }) => {
  // console.log(destination)
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();
  const user = session?.user;
  // console.log(user);
  const [value, setValue] = useState(null);
  //   console.log(new Date(value));

  const handleBookNow = async () => {
    const bookingData = {
      userId: user?.id,
      userName: user?.name,
      userImage: user?.image,
      userEmail: user?.email,
      destinationId: destination._id,
      destinationName: destination.destinationName,
      bookingDate: new Date(value),
      destinationPricce: destination.price,
      destinationImage: destination.imageUrl,
      destinationCountry: destination.country,
    };
    // console.log(bookingData, "booking data");
    // send booking data to database collection
    const res = await fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    const data = await res.json();
    if(data.acknowledged) alert('Booking successful')
  };
  return (
    <div>
      <aside>
        <div className="border border-default-200 shadow-md p-5 md:p-6 space-y-6 lg:sticky lg:top-24">
          {/* Price */}
          <div>
            <p className="text-default-500 text-sm">Starting from</p>

            <h2 className="text-4xl font-semibold text-cyan-600">
              ${destination.price}
            </h2>

            <p className="text-default-500 text-sm">per person</p>
          </div>

          {/* Departure Date */}
          <div className="space-y-4">
            <DatePicker className="w-full" name="date" onChange={setValue}>
              <Label>Date</Label>
              <DateField.Group fullWidth>
                <DateField.Input>
                  {(segment) => <DateField.Segment segment={segment} />}
                </DateField.Input>
                <DateField.Suffix>
                  <DatePicker.Trigger>
                    <DatePicker.TriggerIndicator />
                  </DatePicker.Trigger>
                </DateField.Suffix>
              </DateField.Group>
              <DatePicker.Popover>
                <Calendar aria-label="Event date">
                  <Calendar.Header>
                    <Calendar.YearPickerTrigger>
                      <Calendar.YearPickerTriggerHeading />
                      <Calendar.YearPickerTriggerIndicator />
                    </Calendar.YearPickerTrigger>
                    <Calendar.NavButton slot="previous" />
                    <Calendar.NavButton slot="next" />
                  </Calendar.Header>
                  <Calendar.Grid>
                    <Calendar.GridHeader>
                      {(day) => (
                        <Calendar.HeaderCell>{day}</Calendar.HeaderCell>
                      )}
                    </Calendar.GridHeader>
                    <Calendar.GridBody>
                      {(date) => <Calendar.Cell date={date} />}
                    </Calendar.GridBody>
                  </Calendar.Grid>
                  <Calendar.YearPickerGrid>
                    <Calendar.YearPickerGridBody>
                      {({ year }) => <Calendar.YearPickerCell year={year} />}
                    </Calendar.YearPickerGridBody>
                  </Calendar.YearPickerGrid>
                </Calendar>
              </DatePicker.Popover>
            </DatePicker>

            <div className="border-t border-default-200" />

            {/* <Button onClick={handleBookNow}>
              Book Now
              
            </Button> */}

            <div className="w-full space-y-3">
              <Button onClick={handleBookNow} fullWidth>
                Book Now
              </Button>
            </div>
          </div>

          {/* Booking Benefits */}
          <div className="space-y-3 text-sm text-default-500">
            <p className="flex items-center gap-3">
              <FaCheck className="text-success" />
              Easy booking process
            </p>

            <p className="flex items-center gap-3">
              <FaCheck className="text-success" />
              Secure payment
            </p>

            <p className="flex items-center gap-3">
              <FaCheck className="text-success" />
              Customer support
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default BookingCard;
