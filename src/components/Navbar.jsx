"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "/public/assets/Wanderlast.png";
import { authClient } from "@/lib/auth-client";
import { Avatar, Spinner } from "@heroui/react";
import { LuUser } from "react-icons/lu";

const Navbar = () => {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();
  const user = session?.user;
  console.log(user);
  return (
    <nav className="sticky top-0 z-40 w-full border-separator  backdrop-blur-lg">
      <header className="flex h-16 items-center justify-between px-6">
        {/* <div className="flex items-center gap-3"> */}
        {/* <Logo /> */}
        {/* <p className="font-bold">ACME</p> */}
        {/* </div> */}

        {/* left part */}
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/destinations">Destinations</Link>
          </li>
          <li>
            <Link href="/mybookings">My Bookings</Link>
          </li>
          <li>
            <Link href="/add-destination">Add Destination</Link>
          </li>
        </ul>

        {/* navbar logo */}
        <Image src={logo} alt="navbar logo" />

        {/* right part */}
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/profile">
              <div className="flex gap-1">
                <LuUser size={18} />
                Profile
              </div>
            </Link>
          </li>
          {isPending ? (
            <li>
              <Spinner size="sm" />
            </li>
          ) : user ? (
            <>
              <li>Hi, {user.name}</li>
              <li>
                <Link href="/profile">
                  <Avatar>
                    <Avatar.Image alt={user.name} src={user.image} />
                    <Avatar.Fallback>
                      {user.name?.slice(0, 2).toUpperCase()}
                    </Avatar.Fallback>
                  </Avatar>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </nav>
  );
};

export default Navbar;
