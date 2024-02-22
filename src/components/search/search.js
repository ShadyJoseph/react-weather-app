import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiUrl, geoApiOptions } from "../../api";
import "./search.css";
function Search({ onSearchChange }) {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${geoApiUrl}/cities?minPopulation=100000&namePrefix=${inputValue}`,
        geoApiOptions
      );
      const result = await response.json();

      const options = result.data.map((city) => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`,
      }));

      return {
        options,
        hasMore: false,
        additional: { page: 1 },
      };
    } catch (error) {
      console.error(error);
      return { options: [] };
    }
  };

  return (
    <div className="search-engine">
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </div>
  );
}

export default Search;
