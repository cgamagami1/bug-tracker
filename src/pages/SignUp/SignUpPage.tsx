import { AuthError, AuthErrorCodes } from "firebase/auth";
import { FormEvent, useState, ChangeEvent, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button, { BUTTON_STYLES } from "../../components/Button";
import { UserContext } from "../../context/UserContext";
import SignInAsGuest from "../../components/SignInAsGuest";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../utils/firebase-config";

const SignUpPage = () => {
  const [formFields, setFormFields] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const { createUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsAuthLoading(true);

    if (!formFields.firstName || !formFields.lastName || !formFields.email || !formFields.password || !formFields.confirmPassword) {
      setErrorMessage("One or more required fields are missing");
    }
    else if (formFields.password !== formFields.confirmPassword) {
      setErrorMessage("Passwords do not match");
    }
    else {
      const userData = {
        firstName: formFields.firstName,
        lastName: formFields.lastName,
        email: formFields.email,
        profilePicture: await getDownloadURL(ref(storage, "profilePictures/pexels-pok-rie-130574.jpg")),
        password: formFields.password
      };

      try {
        await createUser(userData);

        navigate("/");
      }
      catch (error) {
        switch ((error as AuthError).code) {
          case AuthErrorCodes.INVALID_EMAIL:
            setErrorMessage("Email is invalid");
            break;
          case AuthErrorCodes.EMAIL_EXISTS:
            setErrorMessage("Email is already in use");
            break;
          case AuthErrorCodes.WEAK_PASSWORD:
            setErrorMessage("Passwords should be at least 6 characters");
            break;
          default:
            setErrorMessage("An error has occured");
            break;
        }
      }
    }

    setFormFields({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
    setIsAuthLoading(false);
  }

  const handleOnFieldChange = (e: ChangeEvent<HTMLInputElement>) => setFormFields({ ...formFields, [e.target.id]: e.target.value });

  return (
    <div className="bg-gray-100 h-screen grid items-center justify-center">
      <form className="bg-white rounded-md px-6 py-2 w-96 flex flex-col" onSubmit={handleOnSubmit}>
        <h3 className="text-xl p-2 border-b border-gray-400">Sign Up</h3>

        <div className="flex justify-between">
          <div className="flex flex-col gap-1 p-2 w-40">
            <label htmlFor="firstName">First Name</label>
            <input className="focus:outline-none border rounded-md h-9 px-2" type="text" id="firstName" value={formFields.firstName} onChange={handleOnFieldChange} />
          </div>
          <div className="flex flex-col gap-1 p-2 w-40">
            <label htmlFor="firstName">Last Name</label>
            <input className="focus:outline-none border rounded-md h-9 px-2" type="text" id="lastName" value={formFields.lastName} onChange={handleOnFieldChange} />
          </div>
        </div>
        <div className="flex flex-col gap-1 p-2">
          <label htmlFor="email">Email</label>
          <input className="focus:outline-none border rounded-md h-9 px-2" type="email" id="email" value={formFields.email} onChange={handleOnFieldChange} />
        </div>
        <div className="flex flex-col gap-1 p-2">
          <label htmlFor="password">Password</label>
          <input className="focus:outline-none border rounded-md h-9 px-2" type="password" id="password" value={formFields.password} onChange={handleOnFieldChange} />
        </div>
        <div className="flex flex-col gap-1 p-2">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input className="focus:outline-none border rounded-md h-9 px-2" type="password" id="confirmPassword" value={formFields.confirmPassword} onChange={handleOnFieldChange} />
        </div>

        <Button type="submit" title="Sign Up" isLoading={isAuthLoading} style={BUTTON_STYLES.AUTH} />
        <span className="text-center p-3">Already have an account? <Link className="text-purple-600 hover:underline" to="/signin">Sign In</Link></span>
        <SignInAsGuest />
        <span className="text-center text-red-600">{ errorMessage }</span>
      </form>
    </div>
  );
}

export default SignUpPage;