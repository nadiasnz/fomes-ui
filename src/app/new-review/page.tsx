'use client';

import React, { useState, useEffect } from 'react';
import {
    Box, TextField, Slider, Button, Typography,
    Rating,
    AutocompleteChangeReason,
    AutocompleteChangeDetails
} from '@mui/material';
import { SearchAutocomplete } from '../ui/autocomplete';
import fomesApi from '../api';
import { useRouter } from 'next/navigation';

export default function NewReview() {
    const [rating, setRating] = useState<null | number>(3);
    const [review, setReview] = useState<string>('');
    const [noise, setNoise] = useState<number>(5);
    const [impact, setImpact] = useState<number>(5);
    const [reviewError, setReviewError] = useState<string>('');
    const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
    const [selectedPlaceError, setSelectedPlaceError] = useState<string>('');
    const [addressNumber, setAddressNumber] = useState<string>('');
    const [addressFloor, setAddressFloor] = useState<string>('');

    const router = useRouter();
    
    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            router.push('/login');
        }
    },
        []
    )

    React.useEffect(
        () => {
            if (review && reviewError) {
                setReviewError('');
            }

            if (selectedPlace && selectedPlaceError) {
                setSelectedPlaceError('');
            }
        },
        [review, selectedPlace]
    )

    const handleSubmit = async () => {
        setReviewError("");
        if (!review) {
            setReviewError("Escriba la reseña, por favor.");
            return;
        }

        if (!selectedPlace) {
            setSelectedPlaceError("Escriba la dirección, por favor.");
            return;
        }


        const reviewData = {
            rating,
            description: review,
            noise_level: noise,
            disturbance_level: impact,
        };

        const placeData = selectedPlace as Object;
        const homeData = { ...placeData, address: placeData.name, zip_code: placeData.postcode, town: placeData.city, floor: addressFloor, number: addressNumber };

        const payload = {
            review: reviewData,
            home: homeData,
        };

        try {
            await fomesApi.post('/reviews:create_with_home/', payload);
            router.push('/my-reviews?review=created')
        } catch (err) {
            setReviewError('No se pudo crear la reseña. Por favor, inténtelo de nuevo.')
        }
    };

    const marks = [
        {
            value: 0,
            label: 0
        },
        {
            value: 10,
            label: 10,
        }
    ]

    const onChange = (
        event: React.SyntheticEvent,
        value: string | null,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<never> | undefined
    ) => {
        setSelectedPlace(value);
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', p: 4 }}>
            <Typography variant="h6" mb={2}>Datos de la vivienda</Typography>
            <SearchAutocomplete placeholder='Escribe la dirección' onChange={onChange} />
            <TextField
                label="Número"
                value={addressNumber}
                onChange={(e) => setAddressNumber(e.target.value)}
                helperText={`Número de la dirección`}
                sx={{ my: 2, margin: '10px', backgroundColor: 'white' }}
                slotProps={{ htmlInput: { maxLength: 5, required: true } }}
                required={true}
                color='success'
            />

            <TextField
                label="Planta y letra"
                value={addressFloor}
                onChange={(e) => setAddressFloor(e.target.value)}
                helperText={`Ejemplo: 2ºA`}
                sx={{ my: 2, margin: '10px', backgroundColor: 'white' }}
                slotProps={{ htmlInput: { maxLength: 5, required: false } }}
                required={false}
                color='success'
            />


            <Box mt={4}>
                <Typography variant="h6" mb={2}>Cuéntanos sobre esta vivienda</Typography>
                <Typography gutterBottom>Valoración general</Typography>

                <Rating
                    name="general-rating"
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue)}
                    sx={{ backgroundColor: "white" }}
                />
            </Box>

            <TextField
                label="Escribe tu reseña"
                multiline
                rows={4}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                fullWidth
                helperText={`${review.length}/1000`}
                sx={{ my: 2, backgroundColor: 'white' }}
                slotProps={{ htmlInput: { maxLength: 1000, required: true } }}
                error={!!reviewError}
                required={true}
                color='success'

            />

            <Typography gutterBottom>Ruido</Typography>
            <Slider
                sx={{ color: '#65a06e' }}
                value={noise}
                onChange={(e, val) => setNoise(val)}
                min={0}
                max={10}
                step={1}
                valueLabelDisplay="auto"
                marks={marks}
            />

            <Typography gutterBottom mt={2}>Impacto en zonas comunes</Typography>
            <Slider
                sx={{ color: '#65a06e' }}
                value={impact}
                onChange={(e, val) => setImpact(val)}
                min={0}
                max={10}
                step={1}
                valueLabelDisplay="auto"
                marks={marks}
            />

            <Box mt={3}>
                <Button
                    sx={{
                        backgroundColor: '#65a06e',
                        color: 'white',
                        fontWeight: 'bold',
                        py: 1.5,
                        borderRadius: 1,
                        boxShadow: '0px 4px 6px rgba(0,0,0,0.15)',
                        '&:hover': { backgroundColor: '#5c9e6e' },
                    }}
                    variant="contained"
                    onClick={handleSubmit}
                >ENVIAR</Button>
                {reviewError && <Typography color='error'>{reviewError}</Typography>}
                {selectedPlaceError && <Typography color='error'>{selectedPlaceError}</Typography>}
            </Box>

            <Typography variant="caption" display="block" mt={3}>
                Tus reseñas son anónimas (nunca se mostrará tu identidad en público), por lo que puedes publicarlas con total sinceridad.
            </Typography>
        </Box>
    );
}
