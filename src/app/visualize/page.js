'use client';

import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Tabs,
  Tab,
  Button,
  Grid
} from '@mui/material';
import CustomerProductView from '@/components/visualize/CustomerProductView';
import ProcessFlowView from '@/components/visualize/ProcessFlowView';
import GeospatialView from '@/components/visualize/GeospatialView';
import OntologyView from '@/components/visualize/OntologyView';
import DataQualityView from '@/components/visualize/DataQualityView';
import OverviewView from '@/components/visualize/OverviewView';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function VisualizePage() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 8 }}>


        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={value} 
              onChange={handleChange} 
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Overview" />
              <Tab label="Master Data Management" />
              <Tab label="Ontology & Object View" />
              {/*<Tab label="Process Flow Visualization" />
              <Tab label="Geospatial Mapping" />*/}
              <Tab label="Data Quality" />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <OverviewView />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CustomerProductView />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <OntologyView />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <DataQualityView />
          <TabPanel value={value} index={4}>
            <ProcessFlowView />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <GeospatialView />
          </TabPanel>
          </TabPanel>
        </Paper>
      </Box>
    </Container>
  );
} 