'use client';

import HomeCard from '../ui/home-card';
import { useState } from 'react';
import {
    Grid,
    Container,
    Pagination,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';


const listings = [
    {
        name: 'Piso en calle Lupiañez 15',
        location: 'Distrito Torres',
        rating: 3,
        noise: 7,
        impact: 7,
        numberOfReviews: 6,
        district: 'huelin',
    },
    {
        name: 'Piso en calle Lupiañez 15',
        location: 'Distrito Torres',
        rating: 3,
        noise: 7,
        impact: 7,
        numberOfReviews: 6,
        district: 'huelin',
    },
    {
        name: 'Piso en calle Lupiañez 15',
        location: 'Distrito Torres',
        rating: 3,
        noise: 7,
        impact: 7,
        numberOfReviews: 6,
        district: 'huelin',
    },
    {
        name: 'Piso en calle Lupiañez 15',
        location: 'Distrito Torres',
        rating: 3,
        noise: 7,
        impact: 7,
        numberOfReviews: 6,
        district: 'huelin',
    },
];

const ITEMS_PER_PAGE = 10;
const TOTAL_RESULTS = 130; // Simulated number of results



export default function MyReviews() {

    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

    const router = useRouter();

    const [paginatedListings, setPaginatedListings] = useState(listings.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    ));

    const deleteOnClick = (index: number) => (event) => {
        setPaginatedListings(paginatedListings.filter((item, itemIndex) => itemIndex !== index));
    }

    const editOnClick = (index: number) => (event) => {
        router.push(`/my-reviews/${index}`);
    }

    return (
        <Container sx={{ mt: 4 }}>


            <Typography align="center" variant="h6" gutterBottom>
                Mis reseñas
            </Typography>

            <Grid
                container
                spacing={4}
                justifyContent="center"
                sx={{ mt: 2, mb: 4 }}
            >
                {paginatedListings.map((item, index) => (
                    <Grid key={item.name}>
                        <HomeCard {...{ isEditable: true, deleteOnClick: deleteOnClick(index), editOnClick: editOnClick(index), ...item }} />
                    </Grid>
                ))}
            </Grid>

            <Grid container justifyContent="center">
                <Pagination
                    count={Math.ceil(TOTAL_RESULTS / ITEMS_PER_PAGE)}
                    page={page}
                    onChange={handleChange}
                    color="primary"
                    shape="rounded"
                    sx={{ backgroundColor: "white" }}
                />
            </Grid>
        </Container>
    )
}