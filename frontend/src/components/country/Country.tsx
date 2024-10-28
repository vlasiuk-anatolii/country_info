import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useGetBorderCountries } from "../../hooks/useGetBorderCountries";
import { useParams } from "react-router-dom";
import Flag from "../flag/Flag";

const Country = () => {
  const params = useParams();
  const { countryCode } = params;

  if (!countryCode) {
    throw new Error("Country code is missing in the URL");
  }
  const { borderCountries, loading, error } =
    useGetBorderCountries(countryCode);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <>
      <Flag />
      <Card sx={{ maxWidth: 400, margin: "20px auto", padding: "10px" }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Border countries:
          </Typography>
          {borderCountries.length > 0 ? (
            <List>
              {borderCountries.map((country) => (
                <ListItem key={country.countryCode}>
                  <Typography variant="body1">{country.commonName}</Typography>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No data on neighboring countries
            </Typography>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Country;
