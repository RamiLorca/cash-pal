import RegistrationForm from "../components/register components/RegistrationForm.component";
import SignInForm from "../components/sign in components/SignInForm.component";
import { useState } from "react";

const SignIn = () => {

  const [isSignedIn, setIsSignedIn] = useState(true);
  
  const toggleForm = () => {
    setIsSignedIn(!isSignedIn);
  };

  return (
    <div>
      <h1>{isSignedIn ? "Sign In" : "Register"}</h1>
      {isSignedIn ? <SignInForm /> : <RegistrationForm />}
      <button onClick={toggleForm}>
        {isSignedIn ? "Need an account? Register" : "Already have an account? Sign In"}
      </button>
    </div>
  )
}

export default SignIn;