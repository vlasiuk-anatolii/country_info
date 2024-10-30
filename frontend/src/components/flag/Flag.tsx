import {

  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useGetFlag } from "../../hooks/useGetFlag";
import { useParams } from "react-router-dom";
import Chart from '../chart/Chart';
import Loader from "../loader/Loader";
import ErrorComponent from "../error/ErrorComponent";

const Flag = () => {
  const params = useParams();
  const { countryCode } = params;

  if (!countryCode) {
    throw new Error("Flag is missing");
  }
  const { data, loading, error } = useGetFlag(countryCode);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorComponent errorMessage={error} />;
  }

  return (
    <>
      <Card sx={{ margin: "20px auto", padding: "10px" }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {data?.name}
          </Typography>
          <Box
            component="img"
            src={data?.flag}
            alt={`${data?.name} flag`}
            sx={{ width: 100, height: 60, margin: "10px auto" }}
          />
        </CardContent>
      </Card>
      <Chart currentCountry={data?.name} />
    </>
  );
};

export default Flag;
