import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({ 
  icon: Icon,
  onClick,
}) => {
  return ( 
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        w-full 
        justify-center 
        rounded-md 
        bg-green-500
        px-4 
        py-2 
        text-gray-200 
        hover:bg-green-600
        focus:outline-offset-0
        drop-shadow-md
      "
    >
      <Icon />
    </button>
   );
}
 
export default AuthSocialButton;
