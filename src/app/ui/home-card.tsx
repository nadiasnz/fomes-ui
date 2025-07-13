import {
  Card, CardContent, Typography, Rating, Box, IconButton,
} from '@mui/material';

import { CircularProgressWithLabel } from './utils';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { MouseEventHandler } from 'react';


type HomeCardProps = {
  name: string,
  district: string,
  rating: number,
  noise: number,
  numberOfReviews: number,
  impact: number,
  isEditable?: boolean,
  editOnClick?:  MouseEventHandler<HTMLAnchorElement> | undefined,
  deleteOnClick?: MouseEventHandler<HTMLAnchorElement> | undefined,
};

export default function HomeCard(props: HomeCardProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{props.name}</Typography>
          {props.isEditable && <Box>
            <IconButton aria-label="edit" size="small" onClick={props.editOnClick}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="delete" size="small" onClick={props.deleteOnClick}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>}
        </Box>

        <Typography variant="body2" color="text.secondary">
          {props.district}
        </Typography>

        <Box mt={1} mb={1}>
          <Typography variant="caption">Valoración General</Typography>
          <Rating value={props.rating} readOnly />
          <Typography variant="caption">({props.numberOfReviews} reseñas)</Typography>
        </Box>

        <Box display="flex" gap={1} mt={2}>
          <CircularProgressWithLabel
            variant="determinate"
            label="Ruido"
            value={props.noise * 10}
          />
          <CircularProgressWithLabel
            variant="determinate"
            label="Impacto en zonas comunes"
            value={props.impact * 10}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
