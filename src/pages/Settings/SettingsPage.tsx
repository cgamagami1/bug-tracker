import { Link } from "react-router-dom"
import Button from "../../components/Button";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { UpdatedUserData, UserContext} from "../../context/UserContext";
import { readFileURL } from "../../utils/read-file-url";
import AuthMenu from "./AuthMenu";
import { updatePassword } from "firebase/auth";

const SettingsPage = () => {
  const { user, userData, updateUserData } = useContext(UserContext);
  const [isAuthMenuVisble, setIsAuthMenuVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [formFields, setFormFields] = useState<UpdatedUserData & { confirmPassword: string }>({ ...userData, password: "", confirmPassword: "" });
  const [pfpPreview, setPfpPreview] = useState(userData.profilePicture);

  const handleOnAuthMenuClose = () => {
    setIsAuthMenuVisible(false);
  }

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    setIsLoading(true);

    try {
      await updateUserData(formFields);
      
      if (formFields.password !== "") {
        if (formFields.password === formFields.confirmPassword) {
          updatePassword(user, formFields.password);
        }
        else {
          throw new Error ("Passwords do not match");
        }
      }

      setStatusMessage("Settings updated!");
    }
    catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  }

  const resetFormFields = () => setFormFields({ ...formFields, password: "", confirmPassword: "" });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => { 
    setFormFields({ ...formFields, [e.target.id]: e.target.value });
    setStatusMessage(""); 
  };

  const handleOnProfilePictureChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormFields({ ...formFields, profilePicture: e.target.files[0] });
      setPfpPreview(await readFileURL(e.target.files[0]));
    }

    setStatusMessage("");
  }

  return (
    <div>
      <h2 className="text-xl mb-6"><Link to="/settings">Settings</Link></h2>

      <form className="bg-white rounded-md px-6 py-2 flex-grow text-sm text-left gap-4" onSubmit={handleOnSubmit}>
        <h3 className="text-xl p-2 border-b border-gray-400">My Settings</h3>

        <div className="flex-col flex px-2 py-4 w-72">
          <img src={pfpPreview} alt="profile picture" className="w-32 h-32 object-cover rounded-[50%]" />
          <label htmlFor="profilePicture" className="text-purple-600 underline ml-3 hover:cursor-pointer mb-4">Change Photo</label>
          <input type="file" accept=".png,.jpg" className="hidden" id="profilePicture" onChange={handleOnProfilePictureChange} />

          <label className="font-bold" htmlFor="firstName">First Name</label>
          <input className="focus:outline-none border rounded-md h-9 px-2 mb-4" type="text" id="firstName" value={formFields.firstName} onChange={handleOnChange} />
          
          <label className="font-bold" htmlFor="lastName">Last Name</label>
          <input className="focus:outline-none border rounded-md h-9 px-2 mb-4" type="text" id="lastName" value={formFields.lastName} onChange={handleOnChange} />

          <label className="font-bold" htmlFor="email">Email</label>
          <input className="focus:outline-none border rounded-md h-9 px-2 mb-4" type="email" id="email" value={formFields.email} onChange={handleOnChange} />

          <label className="font-bold" htmlFor="password">New Password</label>
          <input className="focus:outline-none border rounded-md h-9 px-2 mb-4" type="password" id="password" value={formFields.password} onChange={handleOnChange} />

          <label className="font-bold" htmlFor="confirmPassword">Confirm New Password</label>
          <input className="focus:outline-none border rounded-md h-9 px-2 mb-4" type="password" id="confirmPassword" value={formFields.confirmPassword} onChange={handleOnChange} />

          <Button type="submit" title="Save" isLoading={isLoading} />
          {statusMessage && <p className="mt-2">Settings have been updated!</p>}
        </div>
      </form>

      {isAuthMenuVisble && <AuthMenu handleOnAuthMenuClose={handleOnAuthMenuClose} />}
    </div>
  );
}

export default SettingsPage;