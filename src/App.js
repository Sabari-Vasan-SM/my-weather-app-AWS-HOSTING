// src/App.js
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  IconButton, 
  Box, 
  Grid, 
  Card, 
  CardContent,
  Chip,
  Divider,
  InputAdornment,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Material 3 theme configuration
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6750A4',
      surface: '#FEF7FF',
      onSurface: '#1D1B20',
      container: '#EADDFF',
      onContainer: '#21005D'
    },
    secondary: {
      main: '#625B71',
      container: '#E8DEF8',
      onContainer: '#1D192B'
    },
    tertiary: {
      main: '#7D5260',
      container: '#FFD8E4',
      onContainer: '#31111D'
    },
    surface: {
      main: '#FEF7FF',
      variant: '#E7E0EC'
    },
    background: {
      default: '#FEF7FF',
      paper: '#FEF7FF'
    },
    text: {
      primary: '#1D1B20',
      secondary: '#49454F'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    displayLarge: {
      fontSize: '3.5rem',
      fontWeight: 400,
      lineHeight: 1.12,
      letterSpacing: '-0.25px'
    },
    displayMedium: {
      fontSize: '2.8rem',
      fontWeight: 400,
      lineHeight: 1.16,
      letterSpacing: 0
    },
    headlineLarge: {
      fontSize: '2rem',
      fontWeight: 400,
      lineHeight: 1.25,
      letterSpacing: 0
    },
    headlineMedium: {
      fontSize: '1.75rem',
      fontWeight: 400,
      lineHeight: 1.29,
      letterSpacing: 0
    },
    titleLarge: {
      fontSize: '1.375rem',
      fontWeight: 500,
      lineHeight: 1.27,
      letterSpacing: 0
    },
    bodyLarge: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.5px'
    },
    labelLarge: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.43,
      letterSpacing: '0.1px'
    }
  },
  shape: {
    borderRadius: 20
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
          '&:hover': {
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 28,
            backgroundColor: '#E7E0EC',
            '&:hover': {
              backgroundColor: '#E0D9E6'
            },
            '&.Mui-focused': {
              backgroundColor: '#E7E0EC'
            }
          }
        }
      }
    }
  }
});

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (searchLocation) => {
    setLoading(true);
    setError(null);
    try {
      // WeatherAPI.com endpoint
      const apiKey = '15531e7b6def4bf1b3d61537252202';
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${searchLocation}&aqi=no`
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
                {weatherData.location.name}, {weatherData.location.country}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                {/* You'd dynamically choose icons based on weatherData.current.condition.icon */}
                <WbSunnyIcon sx={{ fontSize: 80, color: 'orange', mr: 2 }} />
                <Typography variant="h1" component="p" sx={{ fontWeight: 'bold', color: 'white' }}>
                  {Math.round(weatherData.current.temp_c)}°C
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ mb: 1, color: 'white' }}>
                {weatherData.current.condition.text}
              </Typography>
              <Grid container spacing={2} justifyContent="center" sx={{ color: 'white' }}>
                <Grid item>
                  <Typography>Feels like: {Math.round(weatherData.current.feelslike_c)}°C</Typography>
                </Grid>
                <Grid item>
                  <Typography>Humidity: {weatherData.current.humidity}%</Typography>
                </Grid>
                <Grid item>
                  <Typography>Wind: {weatherData.current.wind_kph} km/h</Typography>
                </Grid>
                <Grid item>
                  <Typography>UV Index: {weatherData.current.uv}</Typography>
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