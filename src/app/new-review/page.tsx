'use client';

import React, { useState } from 'react';
import {
    Box, TextField, Slider, Button, Typography,
    Rating,
    AutocompleteChangeReason,
    AutocompleteChangeDetails
} from '@mui/material';
import { SearchAutocomplete } from '../ui/autocomplete';

export default function NewReview() {
    const [rating, setRating] = useState<null | number>(3);
    const [review, setReview] = useState<string>('');
    const [noise, setNoise] = useState<number>(5);
    const [impact, setImpact] = useState<number>(5);
    const [reviewError, setReviewError] = useState<string>('');
    const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
    const [selectedPlaceError, setSelectedPlaceError] = useState<string>('');

    React.useEffect(
        () => {
            if (review && reviewError){
                setReviewError('');
            }
            
            if (selectedPlace && selectedPlaceError){
                setSelectedPlaceError('');
            }
        }, 
        [review, selectedPlace]
    )

    const handleSubmit = async () => {
        setReviewError("");
        if (!review){
            setReviewError("Escriba la reseña, por favor.");
            
            return;
        }

        if (!selectedPlace){
            setSelectedPlaceError("Escriba la dirección, por favor.");

            return;
        }
        

        const reviewData = {
            rating,
            review,
            noise,
            impact,
        };

        const homeData = selectedPlace;

        const payload = {
            review: reviewData, 
            home: homeData,
        };


        


        try {
            const res = await fetch('/api/submitReview', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                alert('Reseña enviada con éxito');
            } else {
                alert('Error al enviar la reseña');
            }
        } catch (err) {
            console.error(err);
            alert('Error al enviar la reseña');
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
            <SearchAutocomplete placeholder='Escribe la dirección completa' onChange={onChange}/>

            <Box mt={4}>
                <Typography variant="h6" mb={2}>Cuéntanos sobre esta vivienda</Typography>
                <Typography gutterBottom>Valoración general</Typography>

                <Rating
                    name="general-rating"
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue)}
                    sx={{backgroundColor: "white"}}
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
                slotProps={{htmlInput: {maxLength: 1000, required: true}}}
                error={!!reviewError}
                required={true}
                color='success'
                
            />

            <Typography gutterBottom>Ruido</Typography>
            <Slider
                sx={{color: '#65a06e'}}
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
                sx={{color: '#65a06e'}}
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
