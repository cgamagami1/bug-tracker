import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { AuthError, AuthErrorCodes, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase-config";

const SignInPage = () => {
  const [formFields, setFormFields] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsAuthLoading(true);

    try {
      await signInWithEmailAndPassword(auth, formFields.email, formFields.password);
      navigate("/");
    }
    catch (error) {
      switch ((error as AuthError).code) {
        case AuthErrorCodes.INVALID_EMAIL:
          setErrorMessage("Email is invalid");
          break;
        case AuthErrorCodes.INVALID_PASSWORD:
          setErrorMessage("Incorrect password");
          break;
        case AuthErrorCodes.USER_DELETED:
          setErrorMessage("No user associated with this email");
          break;
        default:
          setErrorMessage("Incorrect email or password");
          break;
      }
    }

    setFormFields({ email: "", password: "" });
    setIsAuthLoading(false);
  }

  const handleOnFieldChange = (e: ChangeEvent<HTMLInputElement>) => setFormFields({ ...formFields, [e.target.id]: e.target.value });

  return (
    <div className="bg-gray-100 h-screen grid items-center justify-center">
      <form className="bg-white rounded-md px-6 py-2 w-96 flex flex-col" onSubmit={handleOnSubmit}>
        <h3 className="text-xl p-2 border-b border-gray-400">Sign In</h3>

        <div className="flex flex-col gap-1 p-2">
          <label htmlFor="email">Email</label>
          <input className="focus:outline-none border rounded-md h-9 px-2" type="email" id="email" value={formFields.email} onChange={handleOnFieldChange} />
        </div>
        <div className="flex flex-col gap-1 p-2">
          <label htmlFor="password">Password</label>
          <input className="focus:outline-none border rounded-md h-9 px-2" type="password" id="password" value={formFields.password} onChange={handleOnFieldChange} />
        </div>

        <Button title="Sign In" type="submit" isLoading={isAuthLoading} />
        <span className="text-center p-3">Don't have an account? <Link className="text-purple-600 hover:underline" to="/signup">Sign Up</Link></span>
        <span className="text-center text-red-600">{ errorMessage }</span>
      </form>
    </div>
  );
}

export default SignInPage;