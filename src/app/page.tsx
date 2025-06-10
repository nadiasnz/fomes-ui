'use client';
import React from "react";
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  Container,
} from "@mui/material";
import { SearchAutocomplete } from "./ui/autocomplete";

const options = [
  "Barcelona",
  "Madrid",
  "Valencia",
  "Sevilla",
  "Bilbao",
  "Granada",
  "Málaga",
];

export default function Home() {
  const [value, setValue] = React.useState<string | null>(null);
  const [inputValue, setInputValue] = React.useState<string>("");

  return (
    <Box>
      {/* Imagen de fondo con autocomplete */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "250px", sm: "300px", md: "350px" },
          backgroundImage: `url('/noisy holiday homes.png')`, 
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <SearchAutocomplete placeholder="Busca tu zona de interés"/>
      </Box>

      {/* Texto inferior */}
      <Container sx={{ mt: 3, textAlign: "center", px: 2 }}>
        <Typography variant="body1">
          ¿Quieres vivir o invertir en la zona que te gusta pero no sabes si el
          turismo está afectando a la convivencia en ella?
        </Typography>
        <Typography variant="body1" mt={1}>
          Encuentra opiniones sobre viviendas turísticas.
        </Typography>
      </Container>
    </Box>
  );
}


