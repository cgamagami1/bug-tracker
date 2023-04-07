import { FormEvent } from "react";
import { Link } from "react-router-dom";

const SignUpPage = () => {

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <div className="bg-gray-100 h-screen grid items-center justify-center">
      <form className="bg-white rounded-md px-6 py-2 w-96 flex flex-col" onSubmit={handleOnSubmit}>
        <h3 className="text-xl p-2 border-b border-gray-400">Sign Up</h3>

        <div className="flex flex-col gap-1 p-2">
          <label htmlFor="name">Name</label>
          <input className="focus:outline-none border rounded-md h-9 px-2" type="text" id="name" />
        </div>
        <div className="flex flex-col gap-1 p-2">
          <label htmlFor="email">Email</label>
          <input className="focus:outline-none border rounded-md h-9 px-2" type="email" id="email" />
        </div>
        <div className="flex flex-col gap-1 p-2">
          <label htmlFor="password">Password</label>
          <input className="focus:outline-none border rounded-md h-9 px-2" type="password" id="password" />
        </div>
        <div className="flex flex-col gap-1 p-2">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input className="focus:outline-none border rounded-md h-9 px-2" type="password" id="confirmPassword" />
        </div>

        <input className="p-2 bg-purple-500 text-white rounded-md m-2 hover:bg-purple-600 hover:cursor-pointer" type="submit" value="Sign In" />
        <span className="text-center p-3">Already have an account? <Link className="text-purple-600 hover:underline" to="/signin">Sign In</Link></span>
      </form>
    </div>
  );
}

export default SignUpPage;