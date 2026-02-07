'use client';

import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Stack,
    CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import fomesApi from '../api';

export default function RegisterPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Extract form data
        const formData = new FormData(e.currentTarget);
        const username = formData.get('username');
        const email = formData.get('email');
        const emailConfirmation = formData.get('email_confirmation');
        const password = formData.get('password');

        if (email !== emailConfirmation) {
            setError('Los emails no coinciden');
            setLoading(false);
            return;
        }

        // API call to create user
        try {
            await fomesApi.post('/register/', { username, email, password }).catch(
                (error) => {
                    // Throw error if the backend response status is not 20x
                    const errorMessage = (error.response.data.username || error.response.data.email) ? 'Usuario ya existente' : 'Error al crear usuario';
                    throw new Error(errorMessage);
            });

            //  Get response payload

            // Redirect to login with welcome messagge
            router.push(`/login?welcome=${encodeURIComponent(username as string)}`);

        } catch (err: any) {
            // Store error message on state
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Container
            maxWidth="sm"
            sx={{
                minHeight: '90vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
                marginTop: '6px',
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ width: '100%' }}
            >
                <Stack spacing={2}>

                    <TextField
                        name="username"
                        label="Nombre de usuario"
                        type="username"
                        color='success'
                        fullWidth
                        required
                        sx={{ backgroundColor: 'white' }}
                    />
                    <TextField
                        name="email"
                        label="Dirección de correo"
                        type="email"
                        color="success"
                        fullWidth
                        required
                        sx={{ backgroundColor: 'white' }}
                    />
                    <TextField
                        name="email_confirmation"
                        label="Repite tu dirección de correo"
                        type="email"
                        color="success"
                        fullWidth
                        required
                        sx={{ backgroundColor: 'white' }}
                    />
                    <TextField
                        name="password"
                        label="Contraseña"
                        type="password"
                        color='success'
                        fullWidth
                        required
                        sx={{ backgroundColor: 'white' }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        sx={{
                            backgroundColor: '#65a06e',
                            color: 'white',
                            fontWeight: 'bold',
                            py: 1.5,
                            borderRadius: 1,
                            boxShadow: '0px 4px 6px rgba(0,0,0,0.15)',
                            '&:hover': { backgroundColor: '#5c9e6e' },
                        }}
                    >
                        {/* Show spinner while the backend is proccessing the request */}
                        {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'CREAR CUENTA'}
                    </Button>
                    {/* Show error message if the request fails */}
                    {error && (
                        <Typography color="error" variant="body2" align="center">
                            {error}
                        </Typography>
                    )}

                </Stack>
            </Box>
        </Container>
    );
}
