import React from 'react'
import { Container, Typography, Box } from '@mui/material'
import UrlForm from '../components/UrlForm'

export default function ShortenerPage() {
  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" align="center" gutterBottom>
          URL Shortener
        </Typography>
        <UrlForm />
      </Box>
    </Container>
  )
}
