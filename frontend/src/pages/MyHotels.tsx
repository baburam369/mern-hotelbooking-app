import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";
import { BsMap, BsPerson, BsStar } from "react-icons/bs";
import { BiBuilding, BiMoney } from "react-icons/bi";

const MyHotels = () => {
  const { showToast } = useAppContext();
  /*Use query gives a response variable called data whenever we do fetch, we can rename it to make more sense */

  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {
        showToast({ message: "Error Fetching Hotels", type: "ERROR" });
      },
      refetchOnWindowFocus: false,
    }
  );

  if (!hotelData) {
    return <span>No Hotels Found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between min-[420px]:flex-row gap-3 flex-col ">
        <h1 className="text-3xl font-bold ">My Hotels</h1>
        <Link
          className="flex bg-blue-600 rounded text-white text-xl font-bold px-3 py-2 hover:bg-blue-500 max-w-[8rem]"
          to={"/add-hotel"}
        >
          Add Hotel
        </Link>
      </span>

      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel) => (
          <div
            key={hotel._id}
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <h2 className="whitespace-pre-line">{hotel.description}</h2>
            <div className="grid lg:grid-cols-5  gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsMap className="mr-2" />
                {hotel.city}, {hotel.country}
              </div>

              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiBuilding className="mr-2" />
                {hotel.type}
              </div>

              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsStar className="mr-2" />
                {hotel.starRating} Star rating
              </div>

              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-3" />
                &#8377;{hotel.pricePerNight} Per night
              </div>

              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsPerson className="mr-2" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
            </div>
            <span className="flex justify-start">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-blue-600 rounded text-white text-md font-bold px-3 py-2 hover:bg-blue-500"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
