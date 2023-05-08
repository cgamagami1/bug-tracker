import { Link } from "react-router-dom"
import Button from "../../components/Button";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

const SettingsPage = () => {
  const { user } = useContext(UserContext);

  const [formFields, setFormFields] = useState({  });
  return (
    <div>
      <h2 className="text-xl mb-6"><Link to="/settings">Settings</Link></h2>

      <form className={`bg-white rounded-md px-6 py-2 flex-grow text-sm text-left flex-col flex gap-4 pb-4`}>
        <h3 className="text-xl p-2 border-b border-gray-400">My Settings</h3>

        <img src="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg" alt="profile picture" className="w-32 h-32 object-cover rounded-[50%]" />
        <label htmlFor="profilePicture" className="text-purple-600 underline ml-3 hover:cursor-pointer">Change Photo</label>
        <input type="file" className="hidden" id="profilePicture" />

        <div className="flex gap-4">
          <div className="flex flex-col col-span-2 gap-1 w-64">
            <label className="font-bold" htmlFor="firstName">First Name</label>

            <input className="focus:outline-none border rounded-md h-9 px-2" type="text" id="firstName" />
          </div>

          <div className="flex flex-col col-span-2 gap-1 w-64">
            <label className="font-bold" htmlFor="lastName">Last Name</label>

            <input className="focus:outline-none border rounded-md h-9 px-2" type="text" id="lastName" />
          </div>
        </div>

        <div className="flex flex-col col-span-2 gap-1 w-64">
          <label className="font-bold" htmlFor="email">Email</label>

          <input className="focus:outline-none border rounded-md h-9 px-2" type="email" id="email" />
        </div>

        <Button type="submit" title="Save" />
      </form>
    </div>
  );
}

export default SettingsPage;