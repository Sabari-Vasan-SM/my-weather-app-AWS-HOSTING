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
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchLocation}&days=3&aqi=no&alerts=no`
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FEF7FF 0%, #F3E5F5 50%, #E1BEE7 100%)',
        py: 3
      }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 4,
            mt: 2
          }}>
            <WbSunnyIcon sx={{ 
              fontSize: 40, 
              color: theme.palette.primary.main, 
              mr: 2 
            }} />
            <Typography 
              variant="displayMedium" 
              sx={{ 
                color: theme.palette.text.primary,
                fontWeight: 500
              }}
            >
              WeatherWise
            </Typography>
          </Box>

          {/* Search Card */}
          <Card sx={{ 
            mb: 4, 
            backgroundColor: theme.palette.surface.main,
            border: `1px solid ${theme.palette.surface.variant}`
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  placeholder="Search for a city or location..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton 
                          type="submit" 
                          sx={{ 
                            bgcolor: theme.palette.primary.main,
                            color: 'white',
                            '&:hover': {
                              bgcolor: theme.palette.primary.dark
                            }
                          }}
                        >
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none'
                      }
                    }
                  }}
                />
              </Box>
            </CardContent>
          </Card>

          {loading && (
            <Box sx={{ textAlign: 'center', my: 4 }}>
              <Typography variant="bodyLarge" color="text.secondary">
                Finding weather information...
              </Typography>
            </Box>
          )}

          {error && (
            <Card sx={{ mb: 4, bgcolor: '#FFEBEE' }}>
              <CardContent>
                <Typography variant="bodyLarge" color="error">
                  {error}
                </Typography>
              </CardContent>
            </Card>
          )}

          {weatherData && (
            <Grid container spacing={3}>
              {/* Main Weather Card */}
              <Grid item xs={12} lg={8}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, #6750A4 0%, #8E7CC3 100%)',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                    {/* Location */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LocationOnIcon sx={{ mr: 1, opacity: 0.9 }} />
                      <Typography variant="titleLarge">
                        {weatherData.location.name}, {weatherData.location.country}
                      </Typography>
                    </Box>

                    {/* Main Temperature */}
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      mb: 3
                    }}>
                      <Box>
                        <Typography variant="displayLarge" sx={{ fontWeight: 300, mb: 1 }}>
                          {Math.round(weatherData.current.temp_c)}°
                        </Typography>
                        <Typography variant="headlineMedium" sx={{ opacity: 0.9, textTransform: 'capitalize' }}>
                          {weatherData.current.condition.text}
                        </Typography>
                      </Box>
                      <WbSunnyIcon sx={{ fontSize: 120, opacity: 0.3 }} />
                    </Box>

                    {/* Weather Details Grid */}
                    <Grid container spacing={3}>
                      <Grid item xs={6} sm={3}>
                        <Box sx={{ textAlign: 'center' }}>
                          <ThermostatIcon sx={{ fontSize: 32, mb: 1, opacity: 0.9 }} />
                          <Typography variant="labelLarge" sx={{ opacity: 0.8, display: 'block' }}>
                            Feels like
                          </Typography>
                          <Typography variant="titleLarge">
                            {Math.round(weatherData.current.feelslike_c)}°C
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Box sx={{ textAlign: 'center' }}>
                          <OpacityIcon sx={{ fontSize: 32, mb: 1, opacity: 0.9 }} />
                          <Typography variant="labelLarge" sx={{ opacity: 0.8, display: 'block' }}>
                            Humidity
                          </Typography>
                          <Typography variant="titleLarge">
                            {weatherData.current.humidity}%
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Box sx={{ textAlign: 'center' }}>
                          <AirIcon sx={{ fontSize: 32, mb: 1, opacity: 0.9 }} />
                          <Typography variant="labelLarge" sx={{ opacity: 0.8, display: 'block' }}>
                            Wind
                          </Typography>
                          <Typography variant="titleLarge">
                            {weatherData.current.wind_kph} km/h
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Box sx={{ textAlign: 'center' }}>
                          <WbTwilightIcon sx={{ fontSize: 32, mb: 1, opacity: 0.9 }} />
                          <Typography variant="labelLarge" sx={{ opacity: 0.8, display: 'block' }}>
                            UV Index
                          </Typography>
                          <Typography variant="titleLarge">
                            {weatherData.current.uv}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                  
                  {/* Background decoration */}
                  <Box sx={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    zIndex: 0
                  }} />
                </Card>
              </Grid>

              {/* Sidebar with additional info */}
              <Grid item xs={12} lg={4}>
                <Grid container spacing={2}>
                  {/* Today's Highlights */}
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Typography variant="titleLarge" sx={{ mb: 2 }}>
                          Today's Highlights
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            p: 2,
                            bgcolor: theme.palette.surface.variant,
                            borderRadius: 2
                          }}>
                            <Typography variant="bodyLarge">Visibility</Typography>
                            <Typography variant="labelLarge" sx={{ fontWeight: 600 }}>
                              {weatherData.current.vis_km} km
                            </Typography>
                          </Box>
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            p: 2,
                            bgcolor: theme.palette.surface.variant,
                            borderRadius: 2
                          }}>
                            <Typography variant="bodyLarge">Pressure</Typography>
                            <Typography variant="labelLarge" sx={{ fontWeight: 600 }}>
                              {weatherData.current.pressure_mb} mb
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>

              {/* Hourly Forecast */}
              {weatherData.forecast && (
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="titleLarge" sx={{ mb: 3 }}>
                        24-Hour Forecast
                      </Typography>
                      <Box sx={{ 
                        display: 'flex', 
                        overflowX: 'auto', 
                        gap: 2,
                        pb: 1,
                        '&::-webkit-scrollbar': {
                          height: 8,
                        },
                        '&::-webkit-scrollbar-track': {
                          background: theme.palette.surface.variant,
                          borderRadius: 4,
                        },
                        '&::-webkit-scrollbar-thumb': {
                          background: theme.palette.primary.main,
                          borderRadius: 4,
                        },
                      }}>
                        {weatherData.forecast.forecastday[0].hour.map((hour, index) => (
                          <Card key={index} sx={{ 
                            minWidth: 100, 
                            textAlign: 'center',
                            bgcolor: index === new Date().getHours() ? theme.palette.primary.container : 'transparent',
                            border: `1px solid ${theme.palette.surface.variant}`
                          }}>
                            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                              <Typography variant="labelLarge" sx={{ mb: 1 }}>
                                {new Date(hour.time).toLocaleTimeString('en-US', { 
                                  hour: 'numeric',
                                  hour12: true 
                                })}
                              </Typography>
                              <WbSunnyIcon sx={{ 
                                fontSize: 32, 
                                color: theme.palette.tertiary.main,
                                mb: 1 
                              }} />
                              <Typography variant="titleLarge">
                                {Math.round(hour.temp_c)}°
                              </Typography>
                            </CardContent>
                          </Card>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              )}

              {/* 3-Day Forecast */}
              {weatherData.forecast && (
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="titleLarge" sx={{ mb: 3 }}>
                        3-Day Forecast
                      </Typography>
                      {weatherData.forecast.forecastday.map((day, index) => (
                        <Box key={index}>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            py: 2,
                            px: 1
                          }}>
                            <Typography variant="bodyLarge" sx={{ 
                              flexGrow: 1, 
                              fontWeight: index === 0 ? 600 : 400 
                            }}>
                              {index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en-US', { 
                                weekday: 'long',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </Typography>
                            <WbSunnyIcon sx={{ 
                              mx: 2, 
                              color: theme.palette.tertiary.main 
                            }} />
                            <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 100 }}>
                              <Typography variant="titleLarge" sx={{ fontWeight: 600 }}>
                                {Math.round(day.day.maxtemp_c)}°
                              </Typography>
                              <Typography variant="bodyLarge" color="text.secondary" sx={{ ml: 1 }}>
                                {Math.round(day.day.mintemp_c)}°
                              </Typography>
                            </Box>
                          </Box>
                          {index < weatherData.forecast.forecastday.length - 1 && (
                            <Divider sx={{ my: 1 }} />
                          )}
                        </Box>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>
              )}
            </Grid>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;