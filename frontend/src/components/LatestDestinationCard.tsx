import { HotelType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

export type Props = {
  hotel: HotelType;
};

const LatestDestinationCard = ({ hotel }: Props) => {
  return (
    <Link
      to={`/detail/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className="h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center "
        />
      </div>
      <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
        <h3 className="text-slate-200 font-bold text-[1.3rem] tracking-wide text-center">
          {hotel.name}
        </h3>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
