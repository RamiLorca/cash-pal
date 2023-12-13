import RegistrationForm from "../../components/register components/RegistrationForm.component";
import SignInForm from "../../components/sign in components/SignInForm.component";
import { useState } from "react";
import "./SignIn.styles.scss";

const SignIn = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);

  const toggleForm = () => {
    setIsSignedIn(!isSignedIn);
  };

  return (
    <div className="main-signin-container">
      <img className="logo-signin-screen" src="cash-pal-logo-white.svg" alt="cash pal logo white" />
      <div className="bg-zinc-800 shadow-md rounded-2xl px-8 pt-6 pb-8 mx-auto my-auto w-fit">
        {/* <h1 className="text-xl font-semibold mb-3">{isSignedIn ? "Sign In" : "Register"}</h1> */}
        {isSignedIn ? <SignInForm /> : <RegistrationForm />}
        <button className="text-base text-gray-300 font-normal mt-3 hover:text-white" onClick={toggleForm}>
          {isSignedIn
            ? "Need an account? Register"
            : "Already have an account? Sign In"}
        </button>
      </div>
    </div>
  );
};

export default SignIn;
