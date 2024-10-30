import {
  Container,
  createTheme,
  CssBaseline,
  Grid,
  ThemeProvider,
} from "@mui/material";
import router from "./components/Routes";
import { RouterProvider } from "react-router-dom";
import Header from "./components/header/Header";
import CountriesList from "./components/countries-list/CountriesList";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="xl">
        <Grid container spacing={5}>
          <Grid xs={12} item md={5} lg={4} xl={3}>
            <CountriesList />
          </Grid>
          <Grid xs={12} item md={7} lg={8} xl={9}>
            <RouterProvider router={router} />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
