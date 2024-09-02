import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

type Props = {
  hotel: HotelType;
};
const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
      <div className="w-full h-[300px]">
        <img
          src={hotel?.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div className="flex-col">
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map((_, index) => (
                <AiFillStar key={index} className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-2 font-normal text-sm ">{hotel.type}</span>
          </div>
          <Link
            to={`/detail/${hotel._id}`}
            className="text-2xl font-bold cursor-pointer hover:text-blue-500 hover:scale-[1.02] inline-block"
          >
            {hotel.name}
          </Link>
        </div>

        <div>
          <div className="text-sm font-medium line-clamp-4">
            {hotel.description}
          </div>
        </div>

        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility, index) => (
              <span
                key={index}
                className="rounded-lg p-2 bg-slate-300 font-bold text-xs hover:scale-[1.10] inline-block"
              >
                {facility}
              </span>
            ))}
            <span className="text-xs">
              {/* {hotel.facilities.slice(3).length > 0
                ? "+" + hotel.facilities.slice(3).length + " more"
                : ""} */}
              {hotel.facilities.length > 3
                ? `+${hotel.facilities.length - 3} more`
                : ""}
            </span>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="font-bold">
              &#8377;
              {hotel.pricePerNight} per night
            </span>
            <Link
              to={`/detail/${hotel._id}`}
              className="rounded p-2 h-full bg-blue-400 font-bold hover:bg-blue-500 cursor-pointer hover:scale-[1.05]  inline-block"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
