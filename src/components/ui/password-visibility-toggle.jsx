import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

const PasswordVisibilityToggle = ({ isHidden, handleToggle, className }) => {
  return (
    <>
      {isHidden ? (
        <EyeOpenIcon
          className={`ml-2 h-4 w-4 absolute inset-y-3 right-3 cursor-pointer select-none ${className}`}
          onClick={handleToggle}
        />
      ) : (
        <EyeClosedIcon
          className={`ml-2 h-4 w-4 absolute inset-y-3 right-3 cursor-pointer select-none ${className}`}
          onClick={handleToggle}
        />
      )}
    </>
  );
};

export default PasswordVisibilityToggle;
