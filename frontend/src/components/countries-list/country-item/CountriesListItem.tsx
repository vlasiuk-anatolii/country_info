import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import { Divider, ListItemButton } from "@mui/material";
import router from "../../Routes";

interface CountriesListItemProps {
  countryCode: string;
  name: string;
}

const CountriesListItem = ({ countryCode,  name }: CountriesListItemProps ) => {
  return (
    <>
      <ListItem alignItems="flex-start" disablePadding>
        <ListItemButton onClick={() => router.navigate(`/countries/${countryCode}`)}>
        <FlagCircleIcon
        sx={{ margin: 2 }} />
          <ListItemText
            primary={name}
            secondary={
              <>
                 {countryCode}
              </>
            }
          />
        </ListItemButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default CountriesListItem;
