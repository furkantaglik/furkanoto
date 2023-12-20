"use client";
import { auth } from "@/utils/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Admin from "../components/Admin";

export const dynamic = "force-dynamic";

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid !== "TILIjqWlIAcj5LJo9g5NVmrPCYA2") {
        setIsAdmin(false);
        router.push("/");
      } else {
        setIsAdmin(true);
      }
    });
  });

  return (
    <>
      {isAdmin ? (
        <Admin />
      ) : (
        <>
          <div className="h-screen flex justify-center items-center">
            <h1>Doğrulanıyor Lütfen Bekleyin...</h1>
          </div>
        </>
      )}
    </>
  );
};

export default AdminPage;
