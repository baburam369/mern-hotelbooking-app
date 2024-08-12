import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className=" container mx-auto ">
      <h2 className="text-3xl font-bold mb-3">Guest</h2>
      <div className="flex gap-5">
        <label className="text-gray-700 text-sm font-bold sm:max-w-[40%] flex-1">
          Adults
          <input
            type="number"
            min={1}
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("adultCount", { required: "This field is required" })}
          />
          {errors.adultCount && (
            <span className="text-red-500 font-medium ">
              {errors.adultCount.message}
            </span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold sm:max-w-[40%] flex-1">
          Children
          <input
            type="number"
            min={1}
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("childCount", { required: "This field is required" })}
          />
          {errors.childCount && (
            <span className="text-red-500 font-medium ">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};
export default GuestsSection;
