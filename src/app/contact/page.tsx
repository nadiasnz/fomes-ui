import { Typography, Link, Box } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function ContactPage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      textAlign="center"
      gap={2}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Hola, soy <strong>Nadia Sáenz</strong>
      </Typography>

      <Link
        href="https://www.linkedin.com/in/nadia-s-94b73a198/" 
        target="_blank"
        rel="noopener noreferrer"
        underline="none"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontSize: "1.2rem",
          color: "#0A66C2",
          fontWeight: "bold",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        <LinkedInIcon />
        Visita mi LinkedIn 
      </Link>
    </Box>
  );
}
