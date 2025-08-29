'use client';

import HomeCard from '../ui/home-card';
import { useState, useEffect } from 'react';
import {
    Grid,
    Container,
    Pagination,
    Typography,
    Box,
    AutocompleteChangeReason,
    AutocompleteChangeDetails,
} from '@mui/material';
import { SearchAutocomplete } from '../ui/autocomplete';
import { useSearchParams } from 'next/navigation'
import fomesApi, { HomeWithReviewStats } from '../api';
import { useRouter } from 'next/navigation';


export default function SearchHomes() {
    const [page, setPage] = useState(1);
    const searchParams = useSearchParams();
    const [homes, setHomes] = useState<null | undefined | Array<HomeWithReviewStats>>(null);
    const [homesCount, setHomesCount] = useState<number>(0);
    const router = useRouter();
    const autoCompleteDefaultValue = searchParams.get('name') && searchParams.get('state') ?
        `${searchParams.get('name')}, ${searchParams.get('state')}` : undefined;

    const handleChange = (event, value) => {
        setPage(value);
    };

    const handleAutocompleteChange = (
        event: React.SyntheticEvent,
        value: string | null,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<never> | undefined
    ) => {
        router.push(`/search-homes?name=${value.name}&state=${value.state}`);
    };


    useEffect(() => {
        const fetchHomes = async () => {
            try {
                const apiResponse = await fomesApi.get(`/homes/?search=${searchParams.get('name')}&page=${page}`);

                setHomes(apiResponse.data.results);
                setHomesCount(apiResponse.data.count);

            } catch (err) {
                setHomes(undefined);
            }
        };

        fetchHomes();
    }, [page, searchParams]);


    return (
        <Container sx={{ mt: 4 }}>
            <Box display="flex" justifyContent="center" mb={3}>
                <SearchAutocomplete
                    placeholder="Busca tu zona de interés"
                    value={autoCompleteDefaultValue}
                    onChange={handleAutocompleteChange}>
                </SearchAutocomplete>
            </Box>

            <Typography align="center" variant="h6" gutterBottom>
                {homesCount} viviendas encontradas
            </Typography>

            <Grid
                container
                spacing={4}
                justifyContent="center"
                sx={{ mt: 2, mb: 4 }}
            >
                {homes?.map((item) => (
                    <Grid key={item.id}>
                        <HomeCard
                            name={item.address}
                            district={item.city}
                            rating={item.avg_rating}
                            numberOfReviews={item.reviews_count}
                            noise={item.avg_noise_level}
                            impact={item.avg_disturbance_level}
                        />
                    </Grid>

                ))}
            </Grid>

            <Grid container justifyContent="center">
                <Pagination
                    count={Math.ceil(homesCount / 10)}
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