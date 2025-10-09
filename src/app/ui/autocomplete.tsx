import React, { useState } from "react";
import { Autocomplete, TextField, CircularProgress, AutocompleteChangeReason, AutocompleteChangeDetails } from "@mui/material";
import debounce from 'lodash/debounce';

type SearchAutocompleteProps = {
  // Text to display when the text field is empty
  placeholder: string;
  // Event listener for when the field value changes
  onChange?: (
    event: React.SyntheticEvent,
    value: string | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<never> | undefined
  ) => void;
  // Default value for the text field
  value?: string;
  // Required fields for the autocomplete results to be considered valid and be displayed
  // E.g. zip code 
  requiredFields?: Array<string>;
};

// Wrapper of MUI autocomplete that gets address results from a free API
export function SearchAutocomplete(props: SearchAutocompleteProps) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Use debounce to delay API call for 1 second 
  // UseCallback makes sure debounce is called only once, otherwise 
  // API calls would accumulate for every key stroke
  const onInputChange = React.useCallback(debounce((event, value) => {
    if (value.length < 3) return;

    setLoading(true);

    fetch(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(
        value
      )}&lang=default&limit=5`,
    )
    .then((res) => res.json())
    .then((data) => {
      const uniquePlaces = new Set();
      // Map every result into an object which we can work with more easily
      const places = data.features.map((feature) => ({
        label: feature.properties.name + ", " + feature.properties.state,
        lat: feature.geometry.coordinates[1],
        lon: feature.geometry.coordinates[0],
        country: feature.properties.country,
        type: feature.properties.type,
        postcode: feature.properties.postcode,
        name: feature.properties.name,
        city: feature.properties.city,
        district: feature.properties.district,
        locality: feature.properties.locality,
        state: feature.properties.state,
        county: feature.properties.county,
      }))
      .filter((place) => {
        if (place.country !== "España"){
          return false;
        }
        if (uniquePlaces.has(place.label)){
          return false;
        }
        uniquePlaces.add(place.label);
        return true;
      }).filter((place) => {
        if (props.requiredFields){
          // Filter only the places that have all the required fields
          for (let field of props.requiredFields){
            if (!place[field]){
              return false;
            }
          }
        }
        return true;
      });
        // Update the autocomplete results to be displayed 
        setOptions(places);
        setLoading(false);
      }) 
      // In case of error from the API, hide the loading spinner
      .catch(() => setLoading(false));

  }, 1000), []);

  return (
    <Autocomplete
      freeSolo
      // Initial value
      value={props.value}
      // Place results for the current value
      options={options}
      getOptionLabel={(option) => option.label || option || ""}
      // Listener for when user types
      onInputChange={onInputChange}
      // Listener for when user clicks on an option
      onChange={props.onChange}
      sx={{
        width: "80%",
        maxWidth: 400,
        backgroundColor: "white",
        borderRadius: "999px",
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={props.placeholder}
        
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }
          }}
        />
      )}
    />
  );
}
