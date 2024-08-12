import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type, index) => (
          <label
            key={index}
            className={
              typeWatch === type
                ? "border rounded-full px-4 py-3 text-sm bg-blue-300 font-semibold text-gray-700 hover:bg-blue-300"
                : "cursor-pointer border rounded-full px-4 py-3 text-sm bg-gray-300 font-semibold text-gray-700 hover:bg-blue-300"
            }
          >
            <input
              type="radio"
              className="hidden "
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
            />
            <span className=" ">{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
