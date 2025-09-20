import SignInForm from "@/components/auth/sign-in";
import ResponsiveSection from "@/components/ui/responsive-section";

import React from "react";

const SignInPage = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <ResponsiveSection className=" flex flex-col justify-center items-center">
        <div className="w-full sm:max-w-[400px] shadow-2xl px-6 border border-gray-3000 py-8 flex flex-col justify-center gap-y-8">
          <p className="text-xl font-bold text-center">Admin </p>
          <SignInForm />
        </div>
      </ResponsiveSection>
    </div>
  );
};

export default SignInPage;
