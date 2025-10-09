'use client';
import React from "react";
import {
  Box,
  Typography,
  Container,
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from "@mui/material";
import { SearchAutocomplete } from "./ui/autocomplete";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const onChange = (
    event: React.SyntheticEvent,
    value: string | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<never> | undefined
  ) => {
    // Redirect to search results for the place selected
    router.push(`/search-homes?name=${value.name}&state=${value.state}`);
  };

  return (
    <Box>
      {/* Background image with search autocomplete */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "250px", sm: "300px", md: "350px" },
          backgroundImage: `url('/pic portada.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <SearchAutocomplete placeholder="Busca tu zona de interés" onChange={onChange} />
      </Box>

      {/* Lower text */}
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


