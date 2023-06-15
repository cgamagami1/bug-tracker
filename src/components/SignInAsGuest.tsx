import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase-config";

const SignInAsGuest = () => {
  const navigate = useNavigate();

  const handleOnSignInAsGuest = async () => {
    await signInWithEmailAndPassword(auth, "demoowner@example.com", "password");
    navigate("/");
  }

  return (
    <p className="text-center">
      <span 
        className="text-purple-600 hover:underline hover:cursor-pointer" 
        onClick={handleOnSignInAsGuest}
      >
        Sign In As Guest
      </span>
      </p>
  );
}

export default SignInAsGuest;