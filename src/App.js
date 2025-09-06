// src/App.js
import React, { useState, useEffect } from 'react';
import { Container, AppBar, Toolbar, Typography, TextField, IconButton, Button, Box, Grid, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WbSunnyIcon from '@mui/icons-material/WbSunny'; // Example icon

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (searchLocation) => {
    setLoading(true);
    setError(null);
    try {
      // Replace with your actual API key and endpoint
      const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&units=metric&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error('Location not found or API error');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      fetchWeather(location);
    }
  };

  return (
    <Container maxWidth="md">
      <AppBar position="static" color="transparent" elevation={0} sx={{ mt: 2, mb: 4 }}>
        <Toolbar>
          <WbSunnyIcon sx={{ mr: 1, color: 'orange' }} />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            WeatherWise
          </Typography>
        </Toolbar>
      </AppBar>

      <Paper component="form" onSubmit={handleSubmit} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', mb: 4, borderRadius: '16px', boxShadow: 3 }}>
        <TextField
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter city or zip code..."
          inputProps={{ 'aria-label': 'enter city or zip code' }}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          variant="standard"
          InputProps={{ disableUnderline: true }}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      {loading && <Typography align="center">Loading weather...</Typography>}
      {error && <Typography align="center" color="error">{error}</Typography>}

      {weatherData && (
        <Grid container spacing={3}>
          {/* Current Weather Card */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center', borderRadius: '16px', boxShadow: 3, background: 'linear-gradient(to right bottom, #87CEEB, #ADD8E6)' }}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'white' }}>
                {weatherData.name}, {weatherData.sys.country}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                {/* You'd dynamically choose icons based on weatherData.weather[0].icon */}
                <WbSunnyIcon sx={{ fontSize: 80, color: 'orange', mr: 2 }} />
                <Typography variant="h1" component="p" sx={{ fontWeight: 'bold', color: 'white' }}>
                  {Math.round(weatherData.main.temp)}°C
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ mb: 1, color: 'white' }}>
                {weatherData.weather[0].description}
              </Typography>
              <Grid container spacing={2} justifyContent="center" sx={{ color: 'white' }}>
                <Grid item>
                  <Typography>H: {Math.round(weatherData.main.temp_max)}°C</Typography>
                </Grid>
                <Grid item>
                  <Typography>L: {Math.round(weatherData.main.temp_min)}°C</Typography>
                </Grid>
                <Grid item>
                  <Typography>Humidity: {weatherData.main.humidity}%</Typography>
                </Grid>
                <Grid item>
                  <Typography>Wind: {weatherData.wind.speed} m/s</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Hourly Forecast (Example Placeholder) */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>Hourly Forecast</Typography>
            <Box sx={{ display: 'flex', overflowX: 'auto', pb: 2 }}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Paper key={index} sx={{ p: 2, minWidth: 120, mr: 2, textAlign: 'center', borderRadius: '12px', boxShadow: 1 }}>
                  <Typography variant="subtitle2">{(index * 3 + 9) % 12 || 12} {((index * 3 + 9) >= 12 && (index * 3 + 9) < 24) ? 'PM' : 'AM'}</Typography>
                  <WbSunnyIcon sx={{ fontSize: 30, color: 'orange' }} />
                  <Typography variant="body1">2{index}°C</Typography>
                </Paper>
              ))}
            </Box>
          </Grid>

          {/* Daily Forecast (Example Placeholder) */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>Daily Forecast</Typography>
            {Array.from({ length: 3 }).map((_, index) => (
              <Paper key={index} sx={{ p: 2, display: 'flex', alignItems: 'center', mb: 1.5, borderRadius: '12px', boxShadow: 1 }}>
                <Typography sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                  {new Date(Date.now() + (index + 1) * 24 * 60 * 60 * 1000).toLocaleString('en-US', { weekday: 'short' })}
                </Typography>
                <WbSunnyIcon sx={{ mr: 2, color: 'orange' }} />
                <Typography sx={{ mr: 1 }}>2{index + 3}°C /</Typography>
                <Typography color="text.secondary">1{index + 8}°C</Typography>
              </Paper>
            ))}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default App;