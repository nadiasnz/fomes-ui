'use client';

import HomeCard from '../ui/home-card';
import { useState } from 'react';
import {
    Grid,
    Container,
    Pagination,
    Typography,
    Box,
} from '@mui/material';
import { SearchAutocomplete } from '../ui/autocomplete';
import { useSearchParams } from 'next/navigation'


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

export default function SearchHomes() {
    const [page, setPage] = useState(1);
    const searchParams = useSearchParams();
    const autoCompleteDefaultValue = searchParams.get('name') && searchParams.get('state') ? 
        `${searchParams.get('name')}, ${searchParams.get('state')}`: undefined;

    const handleChange = (event, value) => {
        setPage(value);
    };

    const paginatedListings = listings.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );


    return (
        <Container sx={{ mt: 4 }}>
            <Box display="flex" justifyContent="center" mb={3}>
                <SearchAutocomplete placeholder="Busca tu zona de interés" value={autoCompleteDefaultValue}></SearchAutocomplete>
            </Box>

            <Typography align="center" variant="h6" gutterBottom>
                {TOTAL_RESULTS} viviendas encontradas
            </Typography>

            <Grid
                container
                spacing={4}
                justifyContent="center"
                sx={{ mt: 2, mb: 4 }}
            >
                {paginatedListings.map((item) => (
                    <Grid key={item.name}>
                        <HomeCard {...item} />
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