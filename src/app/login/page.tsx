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
import Link from 'next/link';

export default function LoginPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Error al iniciar sesión');

            // ✅ Successful login: do something (redirect, token, etc.)
            console.log('Success:', data);
        } catch (err: any) {
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
                        name="email"
                        label="Dirección de correo"
                        type="email"
                        color="success"
                        fullWidth
                        required
                        sx={{backgroundColor: 'white'}}
                    />
                    <TextField
                        name="password"
                        label="Contraseña"
                        type="password"
                        color='success'
                        fullWidth
                        required
                        sx={{backgroundColor: 'white'}}
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
                        {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'INICIAR SESIÓN'}
                    </Button>

                    {error && (
                        <Typography color="error" variant="body2" align="center">
                            {error}
                        </Typography>
                    )}

                    <Typography
                        variant="body2"
                        align="center"
                        sx={{ mt: 1, fontSize: { xs: '0.85rem', sm: '1rem' } }}
                    >
                        ¿Aún no tienes cuenta? Regístrate {' '}
                        <Link href="/register" key="register-link" className="link-blue" >
                            aquí
                        </Link>
                    </Typography>
                </Stack>
            </Box>
        </Container>
    );
}
