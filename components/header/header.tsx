"use client";

import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";

const Header = () => {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // don't render until client mounted

  return (
    <div className="w-full h-[80px] bg-neutral-100 text-gray-800 flex justify-between items-center sm:px-10 px-4 sticky top-0 z-50 backdrop-blur-md shadow">
      <h1 className="font-bold text-xl sm:text-4xl">CDAC MCQ TEST</h1>

      {status === "authenticated" && (
        <div className="flex flex-row gap-x-4">
          <Link href={"/add-question"}>Add Question</Link>
        </div>
      )}

      {status === "authenticated" && (
        <Button onClick={() => signOut()}>Sign out</Button>
      )}
      {status === "unauthenticated" && (
        <Link href={"auth/sign-in"}>Sign In</Link>
      )}
    </div>
  );
};

export default Header;
