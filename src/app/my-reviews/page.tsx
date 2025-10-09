'use client';

import HomeCard from '../ui/home-card';
import { useEffect, useState } from 'react';
import {
    Grid,
    Container,
    Pagination,
    Alert, 
    IconButton,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import fomesApi, { UserReview } from '../api';
import { useSearchParams } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';

export default function MyReviews() {
    const searchParams = useSearchParams();

    const [page, setPage] = useState(1);
    const [reviews, setReviews] = useState<null | undefined | Array<UserReview>>(null);
    const reviewValue = searchParams.get('review');
    const [reviewMessageIsClosed, setReviewMessageIsClosed] = useState(false);
    const [reviewsCount, setReviewsCount] = useState<number>(0);
    const handleChange = (event, value) => {
        setPage(value);
    };

    const router = useRouter();

    // Get review page and total count of reviews from the backend
    // Call API when the page changes 
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const apiResponse = await fomesApi.get(`/reviews:user/?page=${page}`);
                
                setReviews(apiResponse.data.results);
                setReviewsCount(apiResponse.data.count);

            } catch (err) {
                setReviews(undefined);
            }
        };

        fetchReviews();
    }, [page]);

    const deleteOnClick = (reviewId: number, index: number) => (event) => {
        // Update reviews to filter out the deleted review 
        setReviews(reviews?.filter((item, itemIndex) => itemIndex !== index));
        fomesApi.delete(`reviews/${reviewId}/`);
    }

    const editOnClick = (reviewId: number) => (event) => {
        router.push(`/my-reviews/${reviewId}`);
    }

    return (
        <Container sx={{ mt: 4 }}>

            <Typography align="center" variant="h6" gutterBottom>
                Mis reseñas
            </Typography>

            {!reviewMessageIsClosed && reviewValue && <Alert
                severity="success"
                variant="filled"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => setReviewMessageIsClosed(true)}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2, borderRadius: 2, fontSize: '1rem' }}
            >
                {reviewValue == 'created' && 'Tu reseña se ha creado correctamente.'}
                {reviewValue == 'updated' && 'Tu reseña se ha editado correctamente.'}
            </Alert>}

            <Grid
                container   
                spacing={4}
                justifyContent="center"
                sx={{ mt: 2, mb: 4 }}
            >   
            {/* Iterate the reviews and show a card for each one */}
                {reviews?.map((review, index) => (
                    <Grid key={review.id}>
                        <HomeCard
                            isEditable={true}
                            deleteOnClick={deleteOnClick(review.id, index)}
                            editOnClick={editOnClick(review.id)}
                            name={review.home.address}
                            number={review.home.number}
                            floor={review.home.floor}
                            district={review.home.city}
                            rating={review.rating}
                            noise={review.noise_level}
                            impact={review.disturbance_level}
                        />
                    </Grid>
                ))}
            </Grid>
                
            {reviewsCount > 0 && <Grid container justifyContent="center">
                <Pagination
                    count={Math.ceil(reviewsCount / (reviews?.length || 1))}
                    page={page}
                    onChange={handleChange}
                    color="primary"
                    shape="rounded"
                    sx={{ backgroundColor: "white" }}
                />
            </Grid>}
        </Container>
    )
}