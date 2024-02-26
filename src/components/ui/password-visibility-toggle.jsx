import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

const PasswordVisibilityToggle = ({ isHidden, handleToggle }) => {
  return (
    <>
      {isHidden ? (
        <EyeOpenIcon
          className="ml-2 h-4 w-4 absolute inset-y-3 right-3 cursor-pointer select-none"
          onClick={handleToggle}
        />
      ) : (
        <EyeClosedIcon
          className="ml-2 h-4 w-4 absolute inset-y-3 right-3 cursor-pointer select-none"
          onClick={handleToggle}
        />
      )}
    </>
  );
};

export default PasswordVisibilityToggle;
