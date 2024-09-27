import { useQuery } from "react-query";
import * as apiClient from "./../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useSearchContext } from "../context/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { useAppContext } from "../context/AppContext";
import { Elements } from "@stripe/react-stripe-js";

const Booking = () => {
  const search = useSearchContext();
  const { stripePromise } = useAppContext();
  const { hotelId } = useParams();
  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  function durationOfStay(checkIn: Date, checkOut: Date): number {
    const date1 = checkIn.getTime();
    const date2 = checkOut.getTime();
    const nights = (date2 - date1) / (1000 * 60 * 60 * 24);
    return Math.round(nights);
  }

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      setNumberOfNights(durationOfStay(search.checkIn, search.checkOut));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: currentUserData } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  const { data: paymentIntentData } = useQuery(
    "createPaymentIntent",
    () =>
      apiClient.createPaymentIntent(
        hotelId as string,
        numberOfNights.toString()
      ),
    {
      enabled: !!hotelId && numberOfNights > 0,
    }
  );

  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-3">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      {currentUserData && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm
            currentUser={currentUserData}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
};

export default Booking;
