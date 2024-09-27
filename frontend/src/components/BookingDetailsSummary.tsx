import { HotelType } from "../../../backend/src/shared/types";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
}: Props) => {
  //
  return (
    <div className="grid gap-4 border border-slate-300 rounded-md p-5 h-fit">
      <h2 className="text-xl font-bold">Your Booking Details</h2>
      <div className="border-b border-slate-300 py-2">
        Location
        <div className="font-bold">{`${hotel?.name}, ${hotel?.city}, ${hotel?.country}`}</div>
      </div>
      <div className="flex justify-between border-b border-slate-300">
        <div>
          Check-in
          <div className=" font-bold">{checkIn.toDateString()}</div>
        </div>

        <div>
          Check-out
          <div className="font-bold">{checkOut.toDateString()}</div>
        </div>
      </div>
      <div>
        Total length of stays
        <div className="font-bold">
          {numberOfNights} {numberOfNights === 1 ? "night" : "nights"}
        </div>
      </div>

      <div>
        Guests
        <div className="font-bold">
          {adultCount} adults & {childCount} children
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
