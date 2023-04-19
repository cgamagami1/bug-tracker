import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase-config";

const SignOutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const signOutUser = async () => {
      await signOut(auth);
      
      navigate("/signin");
    }

    signOutUser();
  });
  
  return (
    <div></div>
  );
}

export default SignOutPage;