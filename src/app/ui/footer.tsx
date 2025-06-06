import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Stack,
} from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: {
              xs: "center",  // Centrado en móviles
              sm: "flex-end" // A la derecha en pantallas mayores
            },
            textAlign: {
              xs: "center",
              sm: "right"
            },
          }}
        >
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Sobre nosotros
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="grey" underline="hover">
                Quiénes somos
              </Link>
              <Link href="#" color="grey" underline="hover">
                Contacto
              </Link>
              <Link href="#" color="grey" underline="hover">
                Aviso legal
              </Link>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
