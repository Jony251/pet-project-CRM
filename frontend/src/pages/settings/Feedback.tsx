import { useState } from 'react';
import { Alert, Box, Button, Card, CardContent, Rating, TextField, Typography } from '@mui/material';

export default function Feedback() {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState<number | null>(4);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1 }}>Share Your Feedback</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>Help us improve by sharing your thoughts and suggestions.</Typography>

        {submitted && (
          <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSubmitted(false)}>
            Thank you for your feedback!
          </Alert>
        )}

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>How would you rate your experience?</Typography>
          <Rating value={rating} onChange={(_, v) => setRating(v)} size="large" />
        </Box>

        <TextField label="What could we improve?" fullWidth multiline rows={4} sx={{ mb: 3 }} />
        <TextField label="Your email (optional)" fullWidth sx={{ mb: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={() => setSubmitted(true)}>Submit Feedback</Button>
        </Box>
      </CardContent>
    </Card>
  );
}
