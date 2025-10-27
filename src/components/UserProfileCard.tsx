import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const UserProfileCard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // console.log(user);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if(!user) return <p>Loading user not found...</p>;

  return (
    <div className="flex items-center gap-3 h-[102px] bg-white w-fit rounded-3xl p-[18px]">
      <div className="flex rounded-full overflow-hidden size-14">
        <img
          src={user.photo}
          className="size-full object-cover"
          alt="photo"
        />
      </div>
      <div className="flex flex-col gap-[6px] min-w-[155px] w-fit">
        <p className="font-semibold text-lg leading-tight">{"user.name"}</p>
        <p className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none">
          <img
            src="/assets/images/icons/user-grey.svg"
            className="size-[18px]"
            alt="icon"
          />
          
          {user.roles?.join(", ")}

        </p>
      </div>
      <button onClick={handleLogout} className="flex w-6">
        <img
          src="/assets/images/icons/logout.svg"
          className="flex size-6 shrink-0"
          alt="icon"
        />
      </button>
    </div>
  );
};

export default UserProfileCard;
