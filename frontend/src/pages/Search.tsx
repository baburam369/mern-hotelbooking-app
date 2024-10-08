import { useQuery } from "react-query";
import { useSearchContext } from "../context/SearchContext";
import * as apiClient from "../api-client";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import { useState } from "react";
import HotelTypesFilter from "../components/HotelTypesFIlter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };
  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleTypesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hotelType = event.target.value;

    setSelectedTypes((prevTypes) =>
      event.target.checked
        ? [...prevTypes, hotelType]
        : prevTypes.filter((type) => type !== hotelType)
    );
  };

  const handleFacilitiesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelFacility = event.target.value;

    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, hotelFacility]
        : prevFacilities.filter((facility) => facility !== hotelFacility)
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[170px_1fr] xl:grid-cols-[250px_1fr] gap-5">
      <div className="border rounded-lg border-slate-300 p-5 h-fit lg:sticky lg:top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300">
            Filter by:
          </h3>
          <StarRatingFilter
            onChange={handleStarsChange}
            selectedStars={selectedStars}
          />
          <HotelTypesFilter
            onChange={handleTypesChange}
            selectedTypes={selectedTypes}
          />

          <FacilitiesFilter
            onChange={handleFacilitiesChange}
            selectedFacilities={selectedFacilities}
          />

          <PriceFilter
            onChange={(value?: number) => setSelectedPrice(value)}
            selectedPrice={selectedPrice}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          {/* Sort hotel */}
          <select
            className="p-2 border rounded-md"
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (low to high)
            </option>
            <option value="pricePerNightDes">
              Price Per Night (high to low)
            </option>
          </select>
        </div>
        {hotelData?.data.map((hotel) => (
          <SearchResultsCard key={hotel._id} hotel={hotel} />
        ))}

        {hotelData?.pagination?.total === 0 ? (
          <h3 className="flex justify-center items-center relative top-20 font-light text-lg">
            "Hotel not found, try changing the search criteria"
          </h3>
        ) : (
          <div>
            <Pagination
              page={hotelData?.pagination.page || 1}
              pages={hotelData?.pagination.pages || 1}
              onPageChange={(page) => setPage(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
