import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useGetPopulation } from "../../hooks/useGetPopulation";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

interface ChartProps {
  currentCountry: string;
}

const Chart = ({ currentCountry }: ChartProps) => {
  const { population, loading, error } = useGetPopulation(currentCountry);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  const labels = population.map(item => item.year);
  const dataValues = population.map(item => item.value);

  const data = {
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
    <Card sx={{ maxWidth: 600, margin: "20px auto", padding: "10px" }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Population Chart:
        </Typography>
        {population.length > 0 ? (
          <Line data={data} options={options} />
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
