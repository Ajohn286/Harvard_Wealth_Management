import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          mt: 4,
          mb: 8,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Enterprise Data Platform
        </Typography>
        <Typography variant="h5" component="h2" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Transform raw enterprise data into actionable insights in minutes
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <Typography variant="h6" component="h3" gutterBottom>
                Data Ingestion
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Upload your raw data files or connect to your enterprise systems
              </Typography>
              <Button 
                component={Link} 
                href="/upload" 
                variant="contained" 
                color="primary"
                sx={{ mt: 'auto' }}
              >
                Upload Data
              </Button>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <Typography variant="h6" component="h3" gutterBottom>
                Data Transformation
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Automatic data profiling, master data management, and ontology mapping
              </Typography>
              <Button 
                component={Link} 
                href="/transform" 
                variant="contained" 
                color="primary"
                sx={{ mt: 'auto' }}
              >
                Transform Data
              </Button>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <Typography variant="h6" component="h3" gutterBottom>
                Data Visualization
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Interactive dashboards, process flows, and ontology views
              </Typography>
              <Button 
                component={Link} 
                href="/visualize" 
                variant="contained" 
                color="primary"
                sx={{ mt: 'auto' }}
              >
                Visualize Data
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
