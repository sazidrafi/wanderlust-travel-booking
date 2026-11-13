import MyBookingsCard from "@/components/MyBookingsCard";
import { auth } from "@/lib/auth";
import { Button, Link } from "@heroui/react";
import { headers } from "next/headers";

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const userID = session?.user?.id;

  const res = await fetch(`http://localhost:5000/booking/${userID}`);
  const data = await res.json();
  //   console.log(data);

  return (
    <div className="container mx-auto m-10">
      <h2 className="text-5xl mt-10">My Bookings</h2>
      <p className="text-gray-400 text-lg mt-3 mb-4">
        Manage account settings and travel prefenreces
      </p>

      {/* show bookings cards here */}
      {data.length === 0 && (
        <div className="text-center m-9 space-y-9 mt-12">
          <h1 className="text-5xl text-red-500">
            You haven't booked any tour plan yet.
                  </h1>
          <Link href="/destinations"><Button className="text-3xl p-6">Book Now</Button></Link>
        </div>
      )}
      {data.map((dest, idx) => (
        <MyBookingsCard key={idx} data={dest} />
      ))}
    </div>
  );
};

export default MyBookingsPage;
