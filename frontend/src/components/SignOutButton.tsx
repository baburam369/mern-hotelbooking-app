import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      showToast({ message: "Logged out successfully", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/sign-in");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <button
      onClick={handleClick}
      className="flex item-center text-white px-3  py-2 font-bold bg-blue-500 rounded"
    >
      SignOut
    </button>
  );
};

export default SignOutButton;
