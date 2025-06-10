import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, CircularProgress, AutocompleteChangeReason, AutocompleteChangeDetails } from "@mui/material";


type SearchAutocompleteProps<T> = {
  placeholder: string;
  onChange?: (
    event: React.SyntheticEvent,
    value: string | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<never> | undefined
  ) => void;
};

export function SearchAutocomplete<T>(props: SearchAutocompleteProps<T>) {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (input.length < 3) return;

    const controller = new AbortController();
    setLoading(true);

    fetch(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(
        input
      )}&lang=default&limit=5`,
      { signal: controller.signal }
    )
      .then((res) => res.json())
      .then((data) => {
        const uniquePlaces = new Set();
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
          });

        setOptions(places);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    return () => controller.abort();
  }, [input]);

  return (
    <Autocomplete
      freeSolo
      options={options}
      getOptionLabel={(option) => option.label || ""}
      onInputChange={(event, value) => setInput(value)}
      onChange={props.onChange}
      // loading={loading}
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
