import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useGetPopulation } from "../../hooks/useGetPopulation";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import Loader from "../loader/Loader";
import ErrorComponent from "../error/ErrorComponent";

ChartJS.register(...registerables);

interface ChartProps {
  currentCountry: string | undefined;
}

const Chart = ({ currentCountry }: ChartProps) => {
  const { data, loading, error } = useGetPopulation(currentCountry || '');

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorComponent errorMessage={error} />;
  }

  const labels = data?.populationData.map(item => item.year);
  const dataValues = data?.populationData.map(item => item.value);

  const dataForChart = {
    labels: labels,
    datasets: [
      {
        label: 'Population',
        data: dataValues,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Population over the years for ${currentCountry}`,
      },
    },
  };

  return (
    <Card sx={{ margin: "20px auto", padding: "10px" }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Population Chart:
        </Typography>
        {data && data.populationData && data.populationData.length > 0 ? (
          <Line data={dataForChart} options={options} />
        ) : (
          <Typography variant="body2" color="textSecondary">
            No data to display on the chart!
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Chart;
