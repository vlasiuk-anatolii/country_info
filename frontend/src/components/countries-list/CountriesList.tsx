import List from "@mui/material/List";
import CountriesListItem from "../countries-list/country-item/CountriesListItem";
import { Alert, CircularProgress, Divider, Stack } from "@mui/material";
import { useGetCountries } from "../../hooks/useGetCountries";

const CountriesList = () => {
  const { countries, loading, error } = useGetCountries();

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
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
