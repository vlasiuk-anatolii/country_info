import Typography from "@mui/material/Typography";

const Branding = () => {
  return (
    <>
      <Typography
        variant="h6"
        noWrap
        component="a"
        onClick={() => {}}
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          cursor: 'pointer',
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Countries
      </Typography>
    </>
  );
};

export default Branding;
