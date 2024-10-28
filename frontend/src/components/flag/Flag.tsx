import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useGetFlag } from "../../hooks/useGetFlag";
import { useParams } from "react-router-dom";
import Chart from '../chart/Chart';

const Flag = () => {
  const params = useParams();
  const { countryCode } = params;

  if (!countryCode) {
    throw new Error("Flag is missing");
  }
  const { countryFlag, loading, error } = useGetFlag(countryCode);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <>
      <Card sx={{ maxWidth: 400, margin: "20px auto", padding: "10px" }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {countryFlag.name}
          </Typography>
          <Box
            component="img"
            src={countryFlag.flag}
            alt={`${countryFlag.name} flag`}
            sx={{ width: 100, height: 60, margin: "10px auto" }}
          />
        </CardContent>
      </Card>
      <Chart currentCountry={countryFlag.name} />
    </>
  );
};

export default Flag;
