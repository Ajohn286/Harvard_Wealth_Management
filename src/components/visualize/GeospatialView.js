'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  TextField,
  MenuItem,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  Button,
  ButtonGroup,
  Slider,
  Switch,
  FormControlLabel,
  Tooltip,
  ListItemIcon,
  CircularProgress
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import LayersIcon from '@mui/icons-material/Layers';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import InfoIcon from '@mui/icons-material/Info';
import BusinessIcon from '@mui/icons-material/LocalFireDepartment';
import LocalFireDepartmentIcon from '@mui/icons-material/Whatshot';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TerrainIcon from '@mui/icons-material/Terrain';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';

// Mock data for Wealth Management and Private Equity geospatial visualization
const mockGeospatialData = {
  regions: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East', 'Africa'],
  mapTypes: ['Portfolio Distribution', 'Investment Density', 'Risk Exposure', 'Market Coverage', 'ESG Impact'],
  metrics: ['Investment Value', 'Portfolio Size', 'Market Share', 'Risk Score', 'ESG Rating'],
  investmentTypes: ['Private Equity', 'Venture Capital', 'Growth Equity', 'Real Estate', 'Infrastructure', 'ESG', 'Other'],
  portfolioOffices: [
    {
      id: 1,
      name: 'Bain Capital - Boston HQ',
      address: '200 Clarendon Street, Boston, MA 02116',
      coordinates: { lat: 42.3500, lng: -71.0780 },
      portfolioCount: 1243,
      avgInvestmentSize: 250000000,
      riskScore: 82,
      region: 'North America',
      recentInvestments: [
        { id: 'INV-2024-001', type: 'Private Equity', value: 'High', status: 'Active', date: '2024-06-01', company: 'Tech Innovators Inc.' },
        { id: 'INV-2024-002', type: 'Venture Capital', value: 'Medium', status: 'Active', date: '2024-05-28', company: 'AI Solutions Ltd.' },
        { id: 'INV-2024-003', type: 'Growth Equity', value: 'High', status: 'Pending', date: '2024-05-25', company: 'Green Energy Corp' },
        { id: 'INV-2024-004', type: 'Real Estate', value: 'Medium', status: 'Active', date: '2024-05-22', company: 'Urban Development LLC' }
      ]
    },
    {
      id: 2,
      name: 'Sequoia Capital - Menlo Park',
      address: '2800 Sand Hill Road, Menlo Park, CA 94025',
      coordinates: { lat: 37.4275, lng: -122.1697 },
      portfolioCount: 978,
      avgInvestmentSize: 180000000,
      riskScore: 75,
      region: 'North America',
      recentInvestments: [
        { id: 'INV-2024-005', type: 'Venture Capital', value: 'High', status: 'Active', date: '2024-05-30', company: 'CloudTech Solutions' },
        { id: 'INV-2024-006', type: 'Private Equity', value: 'High', status: 'Active', date: '2024-05-27', company: 'Healthcare Plus' },
        { id: 'INV-2024-007', type: 'Growth Equity', value: 'High', status: 'Active', date: '2024-05-20', company: 'FinTech Innovations' },
        { id: 'INV-2024-008', type: 'ESG', value: 'Medium', status: 'Pending', date: '2024-05-18', company: 'Sustainable Energy Co' }
      ]
    },
    {
      id: 3,
      name: 'General Atlantic - London',
      address: '20 St James\'s Street, London SW1A 1ES',
      coordinates: { lat: 51.5074, lng: -0.1378 },
      portfolioCount: 832,
      avgInvestmentSize: 300000000,
      riskScore: 68,
      region: 'Europe',
      recentInvestments: [
        { id: 'INV-2024-009', type: 'Private Equity', value: 'High', status: 'Active', date: '2024-05-29', company: 'European Retail Group' },
        { id: 'INV-2024-010', type: 'Infrastructure', value: 'Medium', status: 'Active', date: '2024-05-26', company: 'Transport Solutions' },
        { id: 'INV-2024-011', type: 'Real Estate', value: 'Low', status: 'Active', date: '2024-05-23', company: 'Property Development Ltd' },
        { id: 'INV-2024-012', type: 'ESG', value: 'Medium', status: 'Active', date: '2024-05-19', company: 'Green Infrastructure Co' }
      ]
    }
  ],
  investmentHotspots: [
    { id: 1, location: 'Silicon Valley', coordinates: { lat: 37.3875, lng: -122.0575 }, investmentIntensity: 91, investmentType: 'Venture Capital', portfolioCompanies: 120, totalInvestments: 340, investmentDate: '2024-05-15' },
    { id: 2, location: 'London Tech Hub', coordinates: { lat: 51.5074, lng: -0.1278 }, investmentIntensity: 78, investmentType: 'Private Equity', portfolioCompanies: 45, totalInvestments: 110, investmentDate: '2024-05-10' },
    { id: 3, location: 'Singapore Financial District', coordinates: { lat: 1.2847, lng: 103.8519 }, investmentIntensity: 65, investmentType: 'Growth Equity', portfolioCompanies: 30, totalInvestments: 75, investmentDate: '2024-05-05' },
    { id: 4, location: 'Dubai International Financial Centre', coordinates: { lat: 25.2048, lng: 55.2708 }, investmentIntensity: 72, investmentType: 'Real Estate', portfolioCompanies: 60, totalInvestments: 150, investmentDate: '2024-05-12' }
  ]
};

// React Leaflet Map Component
const MapComponent = ({ 
  selectedFireStation, 
  selectedHotspot, 
  onSelectFireStation, 
  onSelectHotspot, 
  showHotspots,
  mapZoom,
  onZoomChange,
  mapStyle,
  selectedMapType,
  selectedIncidentType
}) => {
  const [map, setMap] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Load Leaflet dynamically on client side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // This is dynamic import for Leaflet CSS and JS
      // We're doing this because Leaflet requires window/document objects
      const loadLeaflet = async () => {
        try {
          await import('leaflet/dist/leaflet.css');
          const L = await import('leaflet');
          
          // Only initialize if map container exists and map not already initialized
          if (!map && document.getElementById('map-container')) {
            // Initialize map
            const mapInstance = L.default.map('map-container', {
              center: [52.4862, -1.8904], // Center of West Midlands
              zoom: mapZoom,
              zoomControl: false,
            });
            
            // Add OpenStreetMap tile layer
            L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapInstance);
            
            // Set map reference in state
            setMap(mapInstance);
            setMapLoaded(true);
            
            // Listen for zoom changes
            mapInstance.on('zoom', () => {
              onZoomChange(mapInstance.getZoom());
            });
          }
        } catch (error) {
          console.error("Error loading Leaflet:", error);
        }
      };
      
      loadLeaflet();
    }
    
    return () => {
      // Clean up map on unmount
      if (map) {
        map.remove();
      }
    };
  }, []); // Empty dependency array means this runs once on mount
  
  // Update map zoom when prop changes
  useEffect(() => {
    if (map && map.getZoom() !== mapZoom) {
      map.setZoom(mapZoom);
    }
  }, [mapZoom, map]);
  
  // Add/update markers when map is ready or when data changes
  useEffect(() => {
    if (!map || !mapLoaded) return;
    
    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Circle) {
        map.removeLayer(layer);
      }
    });
    
    // Keep the base tile layer
    const baseLayers = [];
    map.eachLayer(layer => {
      if (layer instanceof L.TileLayer) {
        baseLayers.push(layer);
      }
    });
    
    // Add the proper tile layer based on map style
    if (baseLayers.length > 0) {
      // Remove existing tile layers
      baseLayers.forEach(layer => map.removeLayer(layer));
    }
    
    // Add the selected tile layer
    if (mapStyle === 'street') {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
    } else if (mapStyle === 'satellite') {
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      }).addTo(map);
    } else if (mapStyle === 'terrain') {
      L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      }).addTo(map);
    }
    
    // Create icon for fire stations
    const createFireStationIcon = (isSelected) => {
      return L.icon({
        iconUrl: `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${isSelected ? '%23f50057' : '%231976d2'}"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16],
        className: isSelected ? 'marker-selected' : ''
      });
    };
    
    // Create icon for hotspots
    const createHotspotIcon = (intensity, isSelected) => {
      const color = isSelected ? '%23f50057' : '%23ff9800';
      const opacity = isSelected ? '1.0' : '0.9';
      
      return L.icon({
        iconUrl: `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" opacity="${opacity}"><path d="M17.66 11.2c-.23-.3-.51-.56-.77-.82-.67-.6-1.43-1.03-2.07-1.66C13.33 7.26 13 4.85 13.95 3c-.95.23-1.78.75-2.49 1.32-2.59 2.08-3.61 5.75-2.39 8.9.04.1.08.2.08.33 0 .22-.15.42-.35.5-.23.1-.47.04-.66-.12-.06-.05-.1-.13-.14-.2-1.13-1.81-1.27-4.6-.07-6.85-.5.92-.66 2.55.41 4.18.19.25.19.74-.05 1.03-.13.15-.27.18-.35.18-.2 0-.36-.05-.54-.23-1.35-1.36-1.4-4.18-.17-5.8.14-.19.29-.29.43-.37.32-.38.72-.76 1.1-1.06C9.23 2.95 10.27 2.47 12 2.47c1.37 0 2.67.39 3.8 1.02 1.35.75 2.43 1.89 3.11 3.22.19.38.39.75.63 1.1.34.52.35 1.13.15 1.66-.33.87-1.25 1.41-2.3 1.28-.42-.05-.84-.25-1.36-.65a4.9 4.9 0 0 1-.84-.88c-.21-.29-.38-.38-.37-.7.01-.18.03-.28.77.87.33.47.45.88.23 1.08-.41.34-.87-.08-1.42-.67-.15-.25-.26-.4-.3-.5-.45.43-.86.85-1.31 1.26-.4.37-.75.66-1.08.91-.33.25-.65.47-.95.65a8.59 8.59 0 0 0-.75.49c-.53.4-.95.65-1.4.65-.78 0-1.36-.63-1.56-1.25a3.94 3.94 0 0 1-.04-1.86c.24-1.13 1.07-1.97 1.6-2.47.32-.3.65-.54 1-.71.35-.17.7-.3 1.04-.41.35-.1.68-.21 1.01-.32a4.12 4.12 0 0 0 .89-.43c.21-.13.4-.27.58-.43s.34-.33.49-.5c.55-.64 1.27-.97 1.89-.97.7 0 1.28.37 1.56.77.48.59.45 1.15.42 1.27-.03.12-.1.26-.5.26-.1 0-.19-.04-.26-.12-.24-.36-.85-.17-1.24.16-.14.14-.18.22-.13.08.11-.33.03-.4-.3-.55-.36-.18-.89-.13-1.03-.12-.05 0-.1 0-.13.05-.06.05-.1.12-.15.2-.07.1-.16.24-.28.37a8.33 8.33 0 0 1-.92.9c-.12.1-.24.21-.34.3-.17.14-.28.21-.34.24-.18.06-.38.03-.58-.03-.19-.04-.38-.12-.55-.21l-.17-.1c-.29-.16-.5-.37-.7-.57-.36-.38-.6-.82-.8-1.26-.33.61-.29 1.25-.06 1.78.14.27.42.42.68.42.4 0 .8-.37 1.19-.92.03-.05.07-.1.11-.15.38-.47.75-.95 1.1-1.44a6.55 6.55 0 0 1 1-.98c.16-.14.33-.28.5-.4.17-.13.34-.26.5-.38.18-.13.35-.25.51-.39.16-.14.3-.29.43-.45.26-.33.42-.68.42-1.07 0-.41-.18-.8-.62-1.08-.36-.18-.7-.23-1.05-.23-.35 0-.69.04-1.04.11-.31.09-.58.25-.88.41a5.2 5.2 0 0 0-.74.46c-.24.18-.47.38-.72.59-.25.22-.5.44-.78.66-.07.05-.27.22-.67.22-.28.01-.56-.1-.69-.28-.76-1.13.06-2.47.35-2.95a5.89 5.89 0 0 1 1.89-1.97c.59-.39 1.25-.7 1.91-.94.48-.35 1.19-.35 1.35-.35.5 0 .96.12 1.39.3 1.34.57 2.52 1.45 3.35 2.75.47.72.79 1.52.95 2.28.1.47.13.9.09 1.28a2.28 2.28 0 0 1-.34 1.02c-.45.66-1.25 1.07-2.26 1.07-.92 0-1.83-.35-2.55-.86-.76.53-1.65.84-2.55.84zm-1.21-9.9c.06.32.19 1.12-.33 1.83.35-.31.67-.7.85-1.2a4.62 4.62 0 0 0-.36-.63c-.05 0-.08 0-.16 0z"/></svg>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16],
        className: isSelected ? 'marker-selected' : ''
      });
    };
    
    // Filter fire stations based on incident type if needed
    const filteredFireStations = selectedIncidentType === 'All Types' 
      ? mockGeospatialData.portfolioOffices
      : mockGeospatialData.portfolioOffices.filter(fireStation => 
          fireStation.recentInvestments.some(investment => 
            investment.type.toLowerCase().includes(selectedIncidentType.toLowerCase())
          )
        );
    
    // Add fire station markers
    filteredFireStations.forEach(fireStation => {
      const isSelected = selectedFireStation && selectedFireStation.id === fireStation.id;
      const icon = createFireStationIcon(isSelected);
      
      const marker = L.marker([fireStation.coordinates.lat, fireStation.coordinates.lng], { 
        icon,
        zIndexOffset: isSelected ? 1000 : 0
      }).addTo(map);
      
      // Add tooltip
      marker.bindTooltip(fireStation.name, { 
        permanent: false, 
        direction: 'top',
        offset: [0, -10]
      });
      
      // Add click handler
      marker.on('click', () => {
        onSelectFireStation(fireStation);
        
        // Center map on marker
        map.setView([fireStation.coordinates.lat, fireStation.coordinates.lng], 8);
      });
      
      // If this is the selected fire station, center the map on it
      if (isSelected && selectedMapType !== 'Coverage Area') {
        map.setView([fireStation.coordinates.lat, fireStation.coordinates.lng], 8);
      }
    });
    
    // Add hotspot markers if enabled
    if (showHotspots) {
      // Filter hotspots based on incident type
      const filteredHotspots = selectedIncidentType === 'All Types'
        ? mockGeospatialData.investmentHotspots
        : mockGeospatialData.investmentHotspots.filter(hotspot => 
            hotspot.investmentType.toLowerCase().includes(selectedIncidentType.toLowerCase())
          );
          
      filteredHotspots.forEach(hotspot => {
        const isSelected = selectedHotspot && selectedHotspot.id === hotspot.id;
        const icon = createHotspotIcon(hotspot.investmentIntensity, isSelected);
        
        // Add circle to represent intensity
        const circle = L.circle([hotspot.coordinates.lat, hotspot.coordinates.lng], {
          radius: hotspot.investmentIntensity * 5000, // Scale radius by intensity
          fillColor: `rgba(255, ${255 - hotspot.investmentIntensity * 2}, 0, 0.3)`,
          fillOpacity: 0.3,
          stroke: true,
          color: `rgba(255, ${255 - hotspot.investmentIntensity * 2}, 0, 0.7)`,
          weight: 1
        }).addTo(map);
        
        const marker = L.marker([hotspot.coordinates.lat, hotspot.coordinates.lng], { 
          icon,
          zIndexOffset: isSelected ? 2000 : 500
        }).addTo(map);
        
        // Add tooltip
        marker.bindTooltip(`${hotspot.location} - ${hotspot.investmentType}`, {
          permanent: false,
          direction: 'top',
          offset: [0, -10]
        });
        
        // Add click handler
        marker.on('click', () => {
          onSelectHotspot(hotspot);
          
          // Center map on marker
          map.setView([hotspot.coordinates.lat, hotspot.coordinates.lng], 8);
        });
        
        // If this is the selected hotspot, center the map on it
        if (isSelected) {
          map.setView([hotspot.coordinates.lat, hotspot.coordinates.lng], 8);
        }
      });
    }
    
    // Special view for Coverage Area
    if (selectedMapType === 'Coverage Area' && selectedFireStation) {
      // Create a coverage area polygon for the selected fire station
      const center = [selectedFireStation.coordinates.lat, selectedFireStation.coordinates.lng];
      const points = 8;
      const radius = 150000; // meters
      
      const coordinates = [];
      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const offset = (Math.random() - 0.5) * 0.3; // Random variation to make shape irregular
        
        // Calculate point on polygon
        const lat = center[0] + (Math.cos(angle) * (radius + offset * radius)) / 111300;
        const lng = center[1] + (Math.sin(angle) * (radius + offset * radius)) / (111300 * Math.cos(center[0] * (Math.PI / 180)));
        
        coordinates.push([lat, lng]);
      }
      
      // Add the polygon to the map
      L.polygon(coordinates, {
        color: '#1976d2',
        fillColor: '#1976d2',
        fillOpacity: 0.2,
        weight: 2
      }).addTo(map);
      
      // Center the map on the fire station
      map.setView(center, 7);
    }
    
    // If showing risk assessment, add heatmap
    if (selectedMapType === 'Incident Risk') {
      // Simple representation - this would be more sophisticated in a real implementation
      mockGeospatialData.investmentHotspots.forEach(hotspot => {
        L.circle([hotspot.coordinates.lat, hotspot.coordinates.lng], {
          radius: hotspot.investmentIntensity * 8000, // Scale radius by intensity
          fillColor: '#ff5722',
          fillOpacity: 0.2,
          stroke: false
        }).addTo(map);
      });
    }
  }, [map, mapLoaded, selectedFireStation, selectedHotspot, showHotspots, selectedMapType, mapStyle, selectedIncidentType]);
  
  return (
    <>
      <div id="map-container" style={{ height: '100%', width: '100%', borderRadius: '4px' }}>
        {!mapLoaded && (
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100%',
              flexDirection: 'column',
              gap: 2
            }}
          >
            <CircularProgress />
            <Typography variant="body2">Loading map...</Typography>
          </Box>
        )}
      </div>
    </>
  );
};

export default function GeospatialView() {
  const [selectedMapType, setSelectedMapType] = useState('Incident Density');
  const [selectedFireStation, setSelectedFireStation] = useState(null);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [mapZoom, setMapZoom] = useState(4);
  const [showHotspots, setShowHotspots] = useState(true);
  const [selectedIncidentType, setSelectedIncidentType] = useState('All Types');
  const [mapStyle, setMapStyle] = useState('street');

  // Handle map type change
  const handleMapTypeChange = (event) => {
    setSelectedMapType(event.target.value);
  };
  
  // Handle incident type change
  const handleIncidentTypeChange = (event) => {
    setSelectedIncidentType(event.target.value);
    // Reset selections when changing incident type
    setSelectedFireStation(null);
    setSelectedHotspot(null);
  };
  
  // Handle fire station selection
  const handleFireStationSelect = (fireStation) => {
    setSelectedFireStation(fireStation);
    setSelectedHotspot(null);
    setMapZoom(8); // Zoom in when a fire station is selected
  };

  // Handle hotspot selection
  const handleHotspotSelect = (hotspot) => {
    setSelectedHotspot(hotspot);
    setSelectedFireStation(null);
    setMapZoom(8); // Zoom in when a hotspot is selected
  };
  
  // Handle zoom actions
  const handleZoomIn = () => {
    setMapZoom(prev => Math.min(prev + 1, 18));
  };
  
  const handleZoomOut = () => {
    setMapZoom(prev => Math.max(prev - 1, 3));
  };
  
  // Handle map reset
  const handleResetView = () => {
    setSelectedFireStation(null);
    setSelectedHotspot(null);
    setMapZoom(4);
    setShowHotspots(true);
    setSelectedIncidentType('All Types');
    setSelectedMapType('Incident Density');
  };
  
  // Handle map zoom change from the map component
  const handleMapZoomChange = (newZoom) => {
    setMapZoom(newZoom);
  };
  
  // Toggle hotspots
  const handleToggleHotspots = (event) => {
    setShowHotspots(event.target.checked);
  };
  
  // Get metric value for a fire station
  const getMetricValue = (fireStation, metric) => {
    switch(metric) {
      case 'Incident Count':
        return fireStation.portfolioCount.toLocaleString();
      case 'Response Time':
        return fireStation.avgInvestmentSize.toLocaleString();
      case 'Risk Score':
        return fireStation.riskScore;
      default:
        return 'N/A';
    }
  };
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        West Midlands Fire Service Geospatial Incident Analysis
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Visualize emergency incident data across different geographic regions, identifying patterns, hotspots, and trends.
      </Typography>
      
      <Grid container spacing={3}>
        {/* Map Controls & Filters */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom>
              Map Controls
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Map Type</InputLabel>
              <Select
                value={selectedMapType}
                label="Map Type"
                onChange={handleMapTypeChange}
                size="small"
              >
                {mockGeospatialData.mapTypes.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
                <MenuItem value="Coverage Area">Coverage Area</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Incident Type</InputLabel>
              <Select
                value={selectedIncidentType}
                label="Incident Type"
                onChange={handleIncidentTypeChange}
                size="small"
              >
                <MenuItem value="All Types">All Types</MenuItem>
                {mockGeospatialData.investmentTypes.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Divider sx={{ my: 2 }} />
            
            <FormControlLabel
              control={
                <Switch 
                  checked={showHotspots} 
                  onChange={handleToggleHotspots} 
                />
              }
              label="Show Incident Hotspots"
            />
            
            <Box sx={{ mt: 2 }}>
              <ButtonGroup variant="outlined" size="small" fullWidth>
                <Button onClick={handleZoomIn} startIcon={<ZoomInIcon />}>
                  Zoom In
                </Button>
                <Button onClick={handleZoomOut} startIcon={<ZoomOutIcon />}>
                  Zoom Out
                </Button>
              </ButtonGroup>
              
              <Button 
                fullWidth 
                variant="outlined" 
                sx={{ mt: 1 }}
                startIcon={<RestartAltIcon />}
                onClick={handleResetView}
              >
                Reset View
              </Button>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle2" gutterBottom>
              Map Style
            </Typography>
            <ButtonGroup variant="outlined" size="small" fullWidth sx={{ mb: 2 }}>
              <Button 
                variant={mapStyle === 'street' ? 'contained' : 'outlined'}
                onClick={() => setMapStyle('street')}
                startIcon={<MapIcon />}
              >
                Street
              </Button>
              <Button 
                variant={mapStyle === 'satellite' ? 'contained' : 'outlined'}
                onClick={() => setMapStyle('satellite')}
                startIcon={<SatelliteAltIcon />}
              >
                Satellite
              </Button>
              <Button 
                variant={mapStyle === 'terrain' ? 'contained' : 'outlined'}
                onClick={() => setMapStyle('terrain')}
                startIcon={<TerrainIcon />}
              >
                Terrain
              </Button>
            </ButtonGroup>
            
            <Typography variant="subtitle2" gutterBottom>
              Legend
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <BusinessIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">Fire Station</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocalFireDepartmentIcon sx={{ color: 'orange', mr: 1 }} fontSize="small" />
              <Typography variant="body2">Incident Hotspot</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Box sx={{ 
                width: 16, 
                height: 16, 
                borderRadius: '50%', 
                bgcolor: 'rgba(255, 87, 34, 0.2)', 
                border: '1px solid rgba(255, 87, 34, 0.7)', 
                mr: 1 
              }} />
              <Typography variant="body2">Risk Intensity</Typography>
            </Box>
          </Paper>
        </Grid>
        
        {/* Map Visualization */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom>
              {selectedMapType} - United Kingdom
            </Typography>
            
            <Box sx={{ height: 500, mt: 2 }}>
              <MapComponent 
                selectedFireStation={selectedFireStation}
                selectedHotspot={selectedHotspot}
                onSelectFireStation={handleFireStationSelect}
                onSelectHotspot={handleHotspotSelect}
                showHotspots={showHotspots}
                mapZoom={mapZoom}
                onZoomChange={handleMapZoomChange}
                mapStyle={mapStyle}
                selectedMapType={selectedMapType}
                selectedIncidentType={selectedIncidentType}
              />
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Zoom Level: {mapZoom}
              </Typography>
              {(selectedFireStation || selectedHotspot) && (
                <Button 
                  size="small" 
                  startIcon={<RestartAltIcon />}
                  onClick={handleResetView}
                >
                  Reset View
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
        
        {/* Details Panel */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, height: '100%' }}>
            {selectedFireStation ? (
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Fire Station Details
                </Typography>
                <Typography variant="h6">{selectedFireStation.name}</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {selectedFireStation.address}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Region</Typography>
                    <Typography variant="subtitle2">{selectedFireStation.region}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Risk Score</Typography>
                    <Typography variant="subtitle2">{selectedFireStation.riskScore}/100</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Incident Count</Typography>
                    <Typography variant="subtitle2">{selectedFireStation.portfolioCount.toLocaleString()}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Response Time</Typography>
                    <Typography variant="subtitle2">{selectedFireStation.avgInvestmentSize.toLocaleString()}</Typography>
                  </Grid>
                </Grid>
                
                <Typography variant="subtitle2" gutterBottom>
                  Recent Investments
                </Typography>
                <List dense disablePadding>
                  {selectedFireStation.recentInvestments.map((investment, idx) => (
                    <ListItem key={idx} disablePadding sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <Chip 
                          label={idx + 1} 
                          size="small" 
                          sx={{ height: 20, minWidth: 20, fontSize: '0.625rem' }} 
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`${investment.id} - ${investment.type}`}
                        secondary={`${investment.value} • ${investment.status} • ${investment.date}`}
                        primaryTypographyProps={{ variant: 'body2' }}
                        secondaryTypographyProps={{ variant: 'caption' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ) : selectedHotspot ? (
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Incident Hotspot Details
                </Typography>
                <Typography variant="h6" color="error">{selectedHotspot.location}</Typography>
                <Chip 
                  label={selectedHotspot.investmentType} 
                  color="error" 
                  size="small" 
                  sx={{ mt: 1 }} 
                />
                
                <Divider sx={{ my: 2 }} />
                
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Incident Date</Typography>
                    <Typography variant="subtitle2">{selectedHotspot.investmentDate}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Intensity</Typography>
                    <Typography variant="subtitle2">{selectedHotspot.investmentIntensity}%</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Affected People</Typography>
                    <Typography variant="subtitle2">{selectedHotspot.portfolioCompanies.toLocaleString()}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Total Investments</Typography>
                    <Typography variant="subtitle2">{selectedHotspot.totalInvestments.toLocaleString()}</Typography>
                  </Grid>
                </Grid>
                
                <Typography variant="body2" paragraph>
                  This area experienced a significant {selectedHotspot.investmentType.toLowerCase()} event on {selectedHotspot.investmentDate}, affecting {selectedHotspot.portfolioCompanies} companies across multiple fire stations. Total investments reached {selectedHotspot.totalInvestments.toLocaleString()}.
                </Typography>
                
                <Button variant="outlined" size="small" fullWidth>
                  View Detailed Report
                </Button>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <InfoIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="body1" gutterBottom>
                  Select a fire station or hotspot
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click on a marker on the map to view detailed information
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 