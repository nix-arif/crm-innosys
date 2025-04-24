import TabSwitcher from "@/components/TabSwitcher";
import React from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const AuthPage = () => {
  return (
    <div>
      <TabSwitcher SignInTab={<SignInForm />} SignUpTab={<SignUpForm />} />
    </div>
  );
};

export default AuthPage;
