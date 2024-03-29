"use client";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { BsSave2Fill } from "react-icons/bs";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";

const Header = () => {
  return (
    <>
      <header className="sticky top-0 z-20 flex items-center max-w-screen-2xl px-2 md:px-10 py-1 mx-auto bg-black text-white  w-full">
        <div className="w-1/3 flex justify-start">
          <div className="hidden md:block">
            <SearchBar />
          </div>
        </div>
        <Link
          href="/"
          className="flex flex-col items-center justify-center w-1/3 group"
        >
          <Image
            width={40}
            height={40}
            className="animate-spin"
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
              <UserButton.UserProfileLink
                label="Satın Alınanlar"
                url="/Purchased"
                labelIcon={<BiSolidPurchaseTag className="font-bold text-xl" />}
              />
            </UserButton>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">Giriş Yap</Link>
          </SignedOut>
        </div>
      </header>
    </>
  );
};

export default Header;
