import List from "@mui/material/List";
import CountriesListItem from "../countries-list/country-item/CountriesListItem";
import { Divider, Stack } from "@mui/material";
import { useGetCountries } from "../../hooks/useGetCountries";
import Loader from "../loader/Loader";
import ErrorComponent from "../error/ErrorComponent";

const CountriesList = () => {
  const { countries, loading, error } = useGetCountries();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorComponent errorMessage={error} />;
  }

  return (
    <>
      <Stack>
        <Divider />
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          {countries.map((country) => (
            <CountriesListItem
              key={country.countryCode}
              countryCode={country.countryCode}
              name={country.name}
            />
          ))}
        </List>
      </Stack>
    </>
  );
};

export default CountriesList;
