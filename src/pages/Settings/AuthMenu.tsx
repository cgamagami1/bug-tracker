import { AuthError, AuthErrorCodes, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

type AuthMenuProps = {
  handleOnAuthMenuClose: () => void;
}

const AuthMenu = ({ handleOnAuthMenuClose }: AuthMenuProps) => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnReauthentication = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    setIsLoading(true);

    const credential = EmailAuthProvider.credential(user.email!, password)

    try {
      await reauthenticateWithCredential(user, credential);
      handleOnAuthMenuClose();
    }
    catch (error) {
      switch ((error as AuthError).code) {
        case AuthErrorCodes.INVALID_PASSWORD:
          setErrorMessage("Incorrect Password");
          break;
        default:
          setErrorMessage("An error has occured");
          break;
      }
    }

    setIsLoading(false);
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  return (
    <Modal handleOnSubmit={handleOnReauthentication}>
      <label className="inline-block w-full text-center font-bold">Confirm Password</label>
      <input type="password" value={password} onChange={handleOnChange} className="focus:outline-none w-full p-2 bg-gray-100 rounded-md" />
      <Button title="Submit" type="submit" isLoading={isLoading} />
      {errorMessage && <p>{ errorMessage }</p>}
    </Modal>
  );
}

export default AuthMenu;