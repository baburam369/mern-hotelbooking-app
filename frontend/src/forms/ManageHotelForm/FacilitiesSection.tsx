import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-3">Facilites</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelFacilities.map((facility, index) => (
          <label key={index}>
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
            />
            <span className="px-2 font-semibold text-sm text-gray-700">
              {facility}
            </span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold ">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
