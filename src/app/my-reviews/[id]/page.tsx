'use client';

import React, { useState } from 'react';
import {
    Box, TextField, Slider, Button, Typography,
    Rating,
} from '@mui/material';
import { useParams } from 'next/navigation';



export default function EditReview() {
    const [rating, setRating] = useState<null | number>(3);
    const [review, setReview] = useState<string>('');
    const [noise, setNoise] = useState<number>(5);
    const [impact, setImpact] = useState<number>(5);
    const [reviewError, setReviewError] = useState<string>('');
    const params = useParams();

    React.useEffect(
        () => {
            if (review && reviewError) {
                setReviewError('');
            }
        },
        [review]
    )

    React.useEffect(
        () => {
            const reviewData = {
                rating: 2,
                review: 'hi',
                noise: 1,
                impact: 3,
            };
            
            const reviewId = params.id;
            console.log('review ID', reviewId);

            setRating(reviewData.rating);
            setReview(reviewData.review);
            setNoise(reviewData.noise);
            setImpact(reviewData.impact);
        },
        []
    )

    const handleSubmit = async () => {
        setReviewError("");
        if (!review) {
            setReviewError("Escriba la reseña, por favor.");

            return;
        }

        const reviewData = {
            rating,
            review,
            noise,
            impact,
        };

        try {
            const res = await fetch('/api/submitReview', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewData),
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

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', p: 4 }}>

            <Box mt={4}>
                <Typography variant="h6" mb={2}>Editar reseña</Typography>
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
            </Box>

            <Typography variant="caption" display="block" mt={3}>
                Tus reseñas son anónimas (nunca se mostrará tu identidad en público), por lo que puedes publicarlas con total sinceridad.
            </Typography>
        </Box>
    );
}
