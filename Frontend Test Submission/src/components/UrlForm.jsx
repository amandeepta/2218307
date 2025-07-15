import React, { useState } from 'react'
import { TextField, Button, Grid, Typography, Paper, Box } from '@mui/material'
import { shortenUrls } from '../api/urlService'

export default function UrlForm() {
  const [inputs, setInputs] = useState([{ url: '', shortcode: '', validity: '' }])
  const [results, setResults] = useState([])

  const handleChange = (i, f, v) => {
    const u = [...inputs]
    u[i][f] = v
    setInputs(u)
  }

  const addInput = () => {
    if (inputs.length < 5) setInputs([...inputs, { url: '', shortcode: '', validity: '' }])
  }

  const validate = () => {
    for (let i = 0; i < inputs.length; i++) {
      const x = inputs[i]
      const r = /^(https?:\/\/)[^\s$.?#].[^\s]*$/
      if (!r.test(x.url)) return false
      if (x.validity && (!/^\d+$/.test(x.validity) || +x.validity <= 0)) return false
    }
    return true
  }

  const handleSubmit = async () => {
    if (!validate()) return
    const p = inputs.map(x => ({
      longUrl: x.url,
      shortcode: x.shortcode || undefined,
      validityInMinutes: x.validity ? +x.validity : undefined,
    }))
    const res = await shortenUrls(p)
    if (res) setResults(res)
  }

  return (
    <Box>
      {inputs.map((x, i) => (
        <Paper key={i} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Long URL" fullWidth value={x.url} onChange={e => handleChange(i, 'url', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField label="Shortcode (optional)" fullWidth value={x.shortcode} onChange={e => handleChange(i, 'shortcode', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField label="Validity (mins)" fullWidth value={x.validity} onChange={e => handleChange(i, 'validity', e.target.value)} />
            </Grid>
          </Grid>
        </Paper>
      ))}
      <Box display="flex" gap={2} mb={2}>
        <Button variant="outlined" onClick={addInput} disabled={inputs.length >= 5}>Add URL</Button>
        <Button variant="contained" onClick={handleSubmit}>Shorten URLs</Button>
      </Box>
      <Box mt={4}>
        {results.map((r, i) => (
          <Paper key={i} sx={{ p: 2, mb: 2 }}>
            <Typography>Short URL: <a href={r.shortUrl}>{r.shortUrl}</a></Typography>
            <Typography>Expires At: {r.expiresAt}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  )
}
