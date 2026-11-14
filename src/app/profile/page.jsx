"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { Avatar, Card } from "@heroui/react";
import Image from "next/image";

const ProfilePage = () => {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();
  // console.log(session?.user?.image);
  const user = session?.user;

  const handLogout = async () => {
    await authClient.signOut();
  };
  return (
    <div className="container mx-auto m-10">
      <div className="flex justify-between">
        <div>
          <h2 className="text-6xl mt-10">My Profile</h2>
          <p className="text-gray-400 text-lg">
            Manage account settings and travel prefenreces
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handLogout}
          className="bg-red-500 text-white text-xl"
        >
          Logout
        </Button>
      </div>

      <div className="flex justify-between">
        <div>
          <Card className="p-4 gap-2 w-lg space-y-4 text-center flex flex-col items-center">
            {!isPending && (
              <Image
                className="rounded-full"
                src="https://images.unsplash.com/photo-1566759996874-04d713cc224a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
                alt="user profile image"
                width={200}
                height={100}
              />
            )}
            {/* <img
          alt="AI Builders community"
          className="pointer-events-none aspect-square w-14 rounded-2xl object-cover select-none"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg"
          /> */}
            <Card.Header>
              <Card.Title className="text-2xl">{user?.name}</Card.Title>
              <Card.Description>{user?.email}</Card.Description>
            </Card.Header>
            <Card.Footer className="flex gap-2">
              <Button className="rounded-none ">Edit Profile</Button>
            </Card.Footer>
          </Card>
        </div>

        <div>
          <p>Teavel Statistics</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
