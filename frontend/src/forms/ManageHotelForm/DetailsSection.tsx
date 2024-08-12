import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className=" container mx-auto flex flex-col gap-5">
      <h2 className="text-3xl font-bold mb-3">Add Hotel</h2>
      <label className="text-gray-700 text-sm font-bold ">
        Name
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && (
          <span className="text-red-500 font-medium ">
            {errors.name.message}
          </span>
        )}
      </label>

      <div className="flex flex-col md:flex-row gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("city", { required: "This field is required" })}
          />
          {errors.city && (
            <span className="text-red-500 font-medium ">
              {errors.city.message}
            </span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1 ">
          Country
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("country", { required: "This field is required" })}
          />
          {errors.country && (
            <span className="text-red-500 font-medium ">
              {errors.country.message}
            </span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold ">
        Description
        <textarea
          rows={8}
          className="border rounded w-full  py-1 px-2 font-normal"
          {...register("description", { required: "This field is required" })}
        />
        {errors.description && (
          <span className="text-red-500 font-medium ">
            {errors.description.message}
          </span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold sm:max-w-[40%] ">
        Price Per Night
        <input
          type="number"
          min={1}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("pricePerNight", { required: "This field is required" })}
        />
        {errors.pricePerNight && (
          <span className="text-red-500 font-medium ">
            {errors.pricePerNight.message}
          </span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold sm:max-w-[40%]">
        Star Rating
        <select
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("starRating", {
            required: "This field is required",
          })}
        >
          <option value="" className="text-sm font-bold">
            Select a rating
          </option>
          {[1, 2, 3, 4, 5].map((num, index) => (
            <option key={index} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500 font-medium ">
            {errors.starRating.message}
          </span>
        )}
      </label>
    </div>
  );
};
export default DetailsSection;
