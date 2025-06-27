import {
  Card, CardContent, Typography, Rating, Box, Chip,
} from '@mui/material';

import { CircularProgressWithLabel } from './utils';

type HomeCardProps = {
  name: string,
  district: string,
  rating: number,
  noise: number,
  numberOfReviews: number,
  impact: number,
};

export default function HomeCard(props: HomeCardProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">{props.name}</Typography>
        <Typography variant="body2" color="text.secondary">{props.district}</Typography>

        <Box mt={1} mb={1}>
          <Typography variant="caption">Valoración</Typography>
          <Rating value={props.rating} readOnly />
          <Typography variant="caption">({props.numberOfReviews} reviews)</Typography>
        </Box>

        <Box display="flex" gap={1} mt={2}>
          <CircularProgressWithLabel variant="determinate" label= "Ruido" value={props.noise*10} />
          <CircularProgressWithLabel variant="determinate" label = "Impacto en zonas comunes" value={props.impact*10} />

          {/* <CircularProgress variant="determinate" value={75} > {`Noise ${props.noise}/10`}  </CircularProgress> */}
          {/* <Chip label={`Noise ${props.noise}/10`} variant="outlined" color="primary" />
          <Chip label={`Impact ${props.impact}/10`} variant="outlined" color="primary" /> */}
        </Box>
      </CardContent>
    </Card>
  );
}
