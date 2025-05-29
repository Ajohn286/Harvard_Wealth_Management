'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Tooltip,
  Badge
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Mock data for master tables
const masterTableData = {
  items: {
    name: 'Items Master',
    icon: <InventoryIcon />,
    color: '#1976d2',
    recordCount: 583,
    resolvedCount: 12,
    fields: ['Item ID', 'Name', 'Category', 'Price', 'Supplier', 'SKU'],
    samples: [
      { id: 'ITM001', name: 'Widget A', category: 'Hardware', price: '$29.99', supplier: 'ABC Corp', sku: 'SKU-001' },
      { id: 'ITM002', name: 'Widget B', category: 'Hardware', price: '$39.99', supplier: 'XYZ Inc', sku: 'SKU-002' },
      { id: 'ITM003', name: 'Software License', category: 'Software', price: '$99.99', supplier: 'Tech Solutions', sku: 'SKU-003' },
      { id: 'ITM004', name: 'Cloud Storage', category: 'Services', price: '$19.99/mo', supplier: 'Cloud Provider', sku: 'SKU-004' },
      { id: 'ITM005', name: 'Support Plan', category: 'Services', price: '$49.99/mo', supplier: 'Support Inc', sku: 'SKU-005' }
    ]
  },
  services: {
    name: 'Service Ontology',
    icon: <MiscellaneousServicesIcon />,
    color: '#ff9800',
    recordCount: 147,
    resolvedCount: 8,
    fields: ['Service ID', 'Name', 'Category', 'Duration', 'Department', 'Cost'],
    samples: [
      { id: 'SVC001', name: 'Basic Consultation', category: 'Advisory', duration: '1 hour', department: 'Consulting', cost: '$150' },
      { id: 'SVC002', name: 'System Setup', category: 'Implementation', duration: '4 hours', department: 'IT', cost: '$400' },
      { id: 'SVC003', name: 'Training Session', category: 'Training', duration: '2 hours', department: 'Education', cost: '$250' },
      { id: 'SVC004', name: 'Maintenance', category: 'Support', duration: 'Monthly', department: 'Support', cost: '$75/mo' },
      { id: 'SVC005', name: 'Custom Development', category: 'Development', duration: 'Variable', department: 'Engineering', cost: 'Variable' }
    ]
  },
  employees: {
    name: 'Employee Master',
    icon: <PersonIcon />,
    color: '#4caf50',
    recordCount: 328,
    resolvedCount: 15,
    fields: ['Employee ID', 'Name', 'Department', 'Role', 'Location', 'Email'],
    samples: [
      { id: 'EMP001', name: 'John Smith', department: 'Sales', role: 'Sales Manager', location: 'New York', email: 'john.smith@company.com' },
      { id: 'EMP002', name: 'Jane Doe', department: 'Marketing', role: 'Marketing Specialist', location: 'Chicago', email: 'jane.doe@company.com' },
      { id: 'EMP003', name: 'Robert Johnson', department: 'IT', role: 'Systems Administrator', location: 'San Francisco', email: 'robert.johnson@company.com' },
      { id: 'EMP004', name: 'Sarah Williams', department: 'HR', role: 'HR Director', location: 'Boston', email: 'sarah.williams@company.com' },
      { id: 'EMP005', name: 'Michael Brown', department: 'Finance', role: 'Financial Analyst', location: 'Miami', email: 'michael.brown@company.com' }
    ]
  }
};

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
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function MasterTables() {
  const [value, setValue] = useState(0);
  const tableKeys = Object.keys(masterTableData);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Master Data Tables
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Master data tables provide a consolidated view of your core business entities, resolving duplicates and standardizing formats.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {tableKeys.map((key, index) => {
          const table = masterTableData[key];
          return (
            <Grid item xs={12} md={4} key={key}>
              <Card 
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  },
                  border: value === index ? `2px solid ${table.color}` : 'none'
                }}
                onClick={(e) => handleChange(e, index)}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: table.color }}>
                      {table.icon}
                    </Avatar>
                  }
                  action={
                    <Tooltip title="Entity resolution has identified and merged duplicate records">
                      <Badge badgeContent={table.resolvedCount} color="error" sx={{ mr: 1 }}>
                        <IconButton size="small">
                          <MergeTypeIcon fontSize="small" />
                        </IconButton>
                      </Badge>
                    </Tooltip>
                  }
                  title={table.name}
                  subheader={`${table.recordCount} records`}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {table.fields.map((field) => (
                      <Chip 
                        key={field} 
                        label={field} 
                        size="small" 
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 'medium',
              fontSize: '0.9rem',
            }
          }}
        >
          {tableKeys.map((key) => (
            <Tab 
              key={key}
              label={masterTableData[key].name} 
              icon={masterTableData[key].icon} 
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Box>

      {tableKeys.map((key, index) => {
        const table = masterTableData[key];
        return (
          <TabPanel value={value} index={index} key={key}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Records with entity resolution applied:
              </Typography>
              <Chip 
                icon={<CheckCircleIcon fontSize="small" />}
                label={`${table.resolvedCount} duplicates resolved`} 
                size="small" 
                color="success"
              />
            </Box>
            <TableContainer component={Paper} variant="outlined">
              <Table sx={{ minWidth: 650 }} size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'action.hover' }}>
                    {table.fields.map((field) => (
                      <TableCell key={field}>
                        <Typography variant="subtitle2">{field}</Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {table.samples.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.category || row.department}</TableCell>
                      <TableCell>{row.price || row.duration || row.role}</TableCell>
                      <TableCell>{row.supplier || row.department || row.location}</TableCell>
                      <TableCell>{row.sku || row.cost || row.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Showing 5 of {table.recordCount} records
              </Typography>
            </Box>
          </TabPanel>
        );
      })}
    </Box>
  );
} 