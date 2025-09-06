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
  CssBaseline,
  LinearProgress,
  Avatar
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CompressIcon from '@mui/icons-material/Compress';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// Modern gradient-based theme matching the mockup
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8B5CF6',
      light: '#A78BFA',
      dark: '#7C3AED',
    },
    secondary: {
      main: '#F59E0B',
      light: '#FCD34D',
      dark: '#D97706',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#1F2937',
      secondary: '#6B7280'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '4rem',
      fontWeight: 300,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 400,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    }
  },
  shape: {
    borderRadius: 16
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: 'none',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
          }
        }
      }
    }
  }
});

const getWeatherIcon = (condition, size = 40) => {
  const iconStyle = { fontSize: size, color: '#F59E0B' };
  
  if (condition.includes('sun') || condition.includes('clear')) {
    return <WbSunnyIcon sx={iconStyle} />;
  } else if (condition.includes('cloud')) {
    return <CloudIcon sx={iconStyle} />;
  } else if (condition.includes('rain') || condition.includes('storm')) {
    return <ThunderstormIcon sx={iconStyle} />;
  } else if (condition.includes('snow')) {
    return <AcUnitIcon sx={iconStyle} />;
  }
  return <WbSunnyIcon sx={iconStyle} />;
};

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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 2,
        px: 1
      }}>
        <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
          
          {/* Header with search */}
          <Box sx={{ mb: 3, mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOnIcon sx={{ color: 'white', mr: 1 }} />
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 500 }}>
                  {weatherData ? `${weatherData.location.name}, ${weatherData.location.country}` : 'Weather App'}
                </Typography>
              </Box>
              <IconButton 
                onClick={() => setLocation('')}
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' }
                }}
              >
                <SearchIcon />
              </IconButton>
            </Box>

            {/* Search Field */}
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                placeholder="Search location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 3,
                    '& fieldset': {
                      border: 'none'
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.95)'
                    }
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit" edge="end">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
          </Box>

          {loading && (
            <Box sx={{ textAlign: 'center', my: 4 }}>
              <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
                Loading weather...
              </Typography>
              <LinearProgress sx={{ borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.3)' }} />
            </Box>
          )}

          {error && (
            <Card sx={{ mb: 2, bgcolor: 'rgba(255, 255, 255, 0.9)' }}>
              <CardContent>
                <Typography color="error">{error}</Typography>
              </CardContent>
            </Card>
          )}

          {weatherData && (
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              
              {/* Main Weather Card */}
              <Card sx={{ 
                mb: 3,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  
                  {/* Large Temperature Display */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <Typography variant="h1" sx={{ 
                      fontWeight: 200, 
                      color: '#1F2937',
                      mr: 1
                    }}>
                      {Math.round(weatherData.current.temp_c)}°
                    </Typography>
                    {getWeatherIcon(weatherData.current.condition.text.toLowerCase(), 80)}
                  </Box>

                  <Typography variant="h5" sx={{ 
                    color: '#6B7280', 
                    mb: 3,
                    textTransform: 'capitalize'
                  }}>
                    {weatherData.current.condition.text}
                  </Typography>

                  {/* Feels Like & Day/Night */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    borderRadius: 2,
                    p: 2,
                    mb: 2
                  }}>
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography variant="body2" color="text.secondary">
                        Feels like
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {Math.round(weatherData.current.feelslike_c)}°
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" color="text.secondary">
                        {weatherData.current.is_day ? 'Day' : 'Night'}
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                        {new Date().toLocaleDateString('en-US', { 
                          weekday: 'long',
                          day: 'numeric',
                          month: 'short'
                        })}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Weather Metrics Grid */}
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ 
                        backgroundColor: 'rgba(139, 92, 246, 0.1)', 
                        borderRadius: 2, 
                        p: 2,
                        textAlign: 'center'
                      }}>
                        <AirIcon sx={{ fontSize: 24, color: '#8B5CF6', mb: 1 }} />
                        <Typography variant="body2" color="text.secondary">Wind Speed</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {weatherData.current.wind_kph} km/h
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ 
                        backgroundColor: 'rgba(139, 92, 246, 0.1)', 
                        borderRadius: 2, 
                        p: 2,
                        textAlign: 'center'
                      }}>
                        <OpacityIcon sx={{ fontSize: 24, color: '#8B5CF6', mb: 1 }} />
                        <Typography variant="body2" color="text.secondary">Humidity</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {weatherData.current.humidity}%
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ 
                        backgroundColor: 'rgba(139, 92, 246, 0.1)', 
                        borderRadius: 2, 
                        p: 2,
                        textAlign: 'center'
                      }}>
                        <VisibilityIcon sx={{ fontSize: 24, color: '#8B5CF6', mb: 1 }} />
                        <Typography variant="body2" color="text.secondary">Visibility</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {weatherData.current.vis_km} km
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ 
                        backgroundColor: 'rgba(139, 92, 246, 0.1)', 
                        borderRadius: 2, 
                        p: 2,
                        textAlign: 'center'
                      }}>
                        <CompressIcon sx={{ fontSize: 24, color: '#8B5CF6', mb: 1 }} />
                        <Typography variant="body2" color="text.secondary">Pressure</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {weatherData.current.pressure_mb} mb
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Hourly Forecast */}
              {weatherData.forecast && (
                <Card sx={{ 
                  mb: 3,
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Hourly Forecast
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      overflowX: 'auto', 
                      gap: 2,
                      pb: 1,
                      '&::-webkit-scrollbar': { display: 'none' },
                      msOverflowStyle: 'none',
                      scrollbarWidth: 'none'
                    }}>
                      {weatherData.forecast.forecastday[0].hour.slice(0, 12).map((hour, index) => (
                        <Card key={index} sx={{ 
                          minWidth: 80, 
                          textAlign: 'center',
                          backgroundColor: index === 0 ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.05)',
                          boxShadow: 'none'
                        }}>
                          <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                            <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                              {new Date(hour.time).toLocaleTimeString('en-US', { 
                                hour: 'numeric',
                                hour12: true 
                              })}
                            </Typography>
                            <Box sx={{ my: 1 }}>
                              {getWeatherIcon(hour.condition.text.toLowerCase(), 24)}
                            </Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {Math.round(hour.temp_c)}°
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {hour.chance_of_rain}%
                            </Typography>
                          </CardContent>
                        </Card>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              )}

              {/* Weekly Forecast */}
              {weatherData.forecast && (
                <Card sx={{ 
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      {weatherData.forecast.forecastday.length}-Day Forecast
                    </Typography>
                    {weatherData.forecast.forecastday.map((day, index) => (
                      <Box key={index}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          py: 2,
                          px: 1
                        }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body1" sx={{ 
                              fontWeight: index === 0 ? 600 : 400,
                              fontSize: '0.9rem'
                            }}>
                              {index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en-US', { 
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                              {day.day.condition.text}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ mr: 2 }}>
                            {getWeatherIcon(day.day.condition.text.toLowerCase(), 32)}
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 80, justifyContent: 'flex-end' }}>
                            <Typography variant="body1" sx={{ fontWeight: 600, mr: 1 }}>
                              {Math.round(day.day.maxtemp_c)}°
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {Math.round(day.day.mintemp_c)}°
                            </Typography>
                          </Box>
                        </Box>
                        {index < weatherData.forecast.forecastday.length - 1 && (
                          <Divider sx={{ mx: 1 }} />
                        )}
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              )}
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;