import React from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="bg-slate-200 w-full h-screen flex flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
