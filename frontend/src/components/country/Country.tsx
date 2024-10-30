import {
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { useGetBorderCountries } from "../../hooks/useGetBorderCountries";
import { useParams } from "react-router-dom";
import Flag from "../flag/Flag";
import Loader from "../loader/Loader";
import ErrorComponent from "../error/ErrorComponent";

const Country = () => {
  const params = useParams();
  const { countryCode } = params;

  if (!countryCode) {
    throw new Error("Country code is missing in the URL");
  }
  const { borderCountries, loading, error } =
    useGetBorderCountries(countryCode);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorComponent errorMessage={error} />;
  }

  return (
    <>
      <Flag />
      <Card sx={{ margin: "20px auto", padding: "10px" }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Border countries:
          </Typography>
          {borderCountries.length > 0 ? (
            <>
              {borderCountries.map((country) => (
                <Chip
                  key={country.countryCode}
                  label={country.commonName}
                  color="primary"
                  sx={{
                    borderRadius: "8px",
                    padding: "0 8px",
                    backgroundColor: "#e0f7fa",
                    color: "#00796b",
                    fontWeight: 500,
                    margin: "4px",
                  }}
                />
              ))}
            </>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No data on neighboring countries!
            </Typography>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Country;
