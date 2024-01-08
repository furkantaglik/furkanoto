"use client";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { BsSave2Fill } from "react-icons/bs";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <>
      <header className="sticky top-0 z-20 flex items-center max-w-screen-2xl px-2 md:px-10 py-3 mx-auto bg-black text-white  w-full">
        <div className="w-1/3 flex justify-start">
          <div className="hidden md:block">
            <SearchBar />
          </div>
        </div>
        <Link
          href="/"
          className="flex flex-col items-center justify-center w-1/3"
        >
          <img
            className="w-[40px]"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/1200px-Mercedes-Logo.svg.png"
            alt=""
          />
          <h1 className="font-medium text-lg hidden md:block">
            Furkan Otomotiv
          </h1>
        </Link>
        <div className="w-1/3 items-center flex justify-end">
          <SignedIn>
            <UserButton afterSignOutUrl="/">
              <UserButton.UserProfilePage label="account" />
              <UserButton.UserProfilePage label="security" />
              <UserButton.UserProfileLink
                label="Favoriler"
                url="/Saved"
                labelIcon={<BsSave2Fill />}
              />
            </UserButton>
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </header>
    </>
  );
};

export default Header;
