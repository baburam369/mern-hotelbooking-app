import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SignOutButton from "./SignOutButton";

export default function Header() {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6 ">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>Vacaciones.com</Link>
        </span>
        <span className="flex space-x-2 ">
          {isLoggedIn ? (
            <>
              <Link
                to={"/my-bookings"}
                className="flex item-center text-white px-3  py-2 font-bold hover:bg-blue-500 hover:rounded"
              >
                My Bookings
              </Link>

              <Link
                to={"/my-hotels"}
                className="flex item-center text-white px-3  py-2 font-bold hover:bg-blue-500 hover:rounded"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to={"/sign-in"}
              className="flex item-center text-white px-3  py-2 font-bold hover:bg-blue-500 hover:rounded"
            >
              Sign in
            </Link>
          )}
        </span>
      </div>
    </div>
  );
}
