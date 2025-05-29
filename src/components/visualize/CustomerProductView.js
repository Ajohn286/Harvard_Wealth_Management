'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';

// Mock personnel data
const personnelData = {
  overview: {
    totalPersonnel: 15200,
    activePersonnel: 12458,
    inactivePersonnel: 2742,
    averageLifetimeValue: '$2,347',
    topSegment: 'Premium',
    recentPurchases: 843
  },
  dataSources: {
    erp: {
      name: 'ERP Systems',
      sources: ['SAP ERP', 'NetSuite'],
      lastUpdated: '2023-10-21 08:45 AM',
      recordCount: 15224,
      status: 'Connected',
      confidence: 93,
    },
    crm: {
      name: 'CRM Systems',
      sources: ['Salesforce'],
      lastUpdated: '2023-10-21 11:30 AM',
      recordCount: 15198,
      status: 'Connected',
      confidence: 97,
    },
    claims: {
      name: 'Policy Admin Systems',
      sources: ['Ebix OneOffice', 'FINEOS AdminSuite'],
      lastUpdated: '2023-10-20 06:15 PM',
      recordCount: 8432,
      status: 'Connected',
      confidence: 89,
    }
  },
  personnel: [
    {
      id: 'CU12345',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '(555) 123-4567',
      location: 'New York, NY',
      segment: 'Premium',
      lifetimeValue: '$4,562',
      status: 'Active',
      sourceRecords: {
        erp: {
          source: 'SAP ERP',
          id: 'ERP-10034782',
          name: 'Smith, John A.',
          email: 'john.smith@example.com',
          phone: '(555) 123-4567',
          location: 'New York, NY 10022',
          accountBalance: '$2,450.00',
          lastTransaction: '2023-10-10',
          customerSince: '2018-05-12',
          matchConfidence: 98,
          variants: ['Smith, John', 'Smith, J.'],
          accountType: 'Corporate'
        },
        crm: {
          source: 'Salesforce',
          id: 'SF-8843201',
          name: 'John Smith',
          email: 'john.smith@example.com',
          phone: '(555) 123-4567',
          location: 'New York, NY',
          industry: 'Technology',
          territory: 'Northeast',
          leadSource: 'Website',
          matchConfidence: 100,
          lastActivity: '2023-10-15',
          stage: 'Customer'
        },
        claims: {
          source: 'Ebix OneOffice',
          id: 'EBIX-773829',
          name: 'John A. Smith',
          email: 'john.smith@example.com',
          phone: '(555) 123-4567',
          location: 'New York, NY',
          policyNumber: 'POL-112233',
          claimHistory: 3,
          lastClaim: '2023-08-22',
          matchConfidence: 96,
          riskScore: 'Low',
          claimStatus: 'Settled',
          policyType: 'Health & Disability',
          policyStartDate: '2021-01-15',
          policyEndDate: '2024-01-14'
        }
      },
      reconciliation: {
        conflictFields: ['name', 'location'],
        resolvedFields: ['email', 'phone'],
        matchingRules: ['Email Exact Match', 'Phone Number Match', 'Name Fuzzy Match'],
        consolidationDate: '2023-10-18',
        goldenRecord: true,
        dataQualityScore: 94,
        processingSteps: [
          'Initial data ingestion',
          'Standardization and cleansing',
          'Duplicate detection',
          'Record linking',
          'Survivorship rules application',
          'Golden record creation'
        ]
      },
      recentActivity: [
        { id: 'CLM-7890', type: 'Claim Filed', date: '2023-10-15', details: 'Health claim processed', source: 'FINEOS AdminSuite' },
        { id: 'POL-7825', type: 'Policy Renewal', date: '2023-09-28', details: 'Auto policy renewed', source: 'Ebix OneOffice' },
        { id: 'INQ-7722', type: 'Customer Inquiry', date: '2023-09-10', details: 'Benefits verification', source: 'Salesforce' }
      ],
      claims: [
        { 
          id: 'CLM-001', 
          date: '2023-08-22', 
          type: 'Property Damage', 
          status: 'Settled', 
          amount: '$2,500.00', 
          policyNumber: 'POL-112233',
          source: 'Ebix OneOffice',
          riskLevel: 'Medium'
        },
        { 
          id: 'CLM-002', 
          date: '2022-11-15', 
          type: 'Medical', 
          status: 'Paid', 
          amount: '$5,750.00', 
          policyNumber: 'POL-112233',
          source: 'FINEOS AdminSuite',
          riskLevel: 'High'
        },
        { 
          id: 'CLM-003', 
          date: '2021-06-04', 
          type: 'Liability', 
          status: 'Closed', 
          amount: '$1,200.00', 
          policyNumber: 'POL-112233',
          source: 'Ebix OneOffice',
          riskLevel: 'Low'
        }
      ]
    },
    {
      id: 'CU12346',
      name: 'Jane Doe',
      email: 'jane.doe@company.co',
      phone: '(555) 987-6543',
      location: 'San Francisco, CA',
      segment: 'Standard',
      lifetimeValue: '$2,135',
      status: 'Active',
      recentPurchases: [
        { id: 'ORD-7891', date: '2023-10-14', amount: '$89.99', items: 1 },
        { id: 'ORD-7800', date: '2023-08-22', amount: '$199.99', items: 2 }
      ],
      products: [
        { id: 'PROD-456', name: 'Software License', category: 'Software', price: '$149.99', quantity: 1 },
        { id: 'PROD-222', name: 'Basic Widget', category: 'Hardware', price: '$39.99', quantity: 1 }
      ]
    },
    {
      id: 'CU12347',
      name: 'Michael Johnson',
      email: 'michael.j@domain.org',
      phone: '(555) 555-1212',
      location: 'Chicago, IL',
      segment: 'Premium',
      lifetimeValue: '$5,829',
      status: 'Active',
      recentPurchases: [
        { id: 'ORD-7895', date: '2023-10-18', amount: '$499.99', items: 4 },
        { id: 'ORD-7850', date: '2023-09-05', amount: '$299.99', items: 2 },
        { id: 'ORD-7760', date: '2023-08-15', amount: '$199.99', items: 1 }
      ],
      products: [
        { id: 'PROD-123', name: 'Premium Widget', category: 'Hardware', price: '$99.99', quantity: 3 },
        { id: 'PROD-789', name: 'Support Plan', category: 'Services', price: '$49.99', quantity: 1 },
        { id: 'PROD-555', name: 'Cloud Storage', category: 'Services', price: '$19.99', quantity: 2 }
      ]
    }
  ]
};

export default function CustomerProductView() {
  // Always use John Smith (first customer) and remove the ability to select customers
  const selectedPersonnel = personnelData.personnel[0];
  const [searchQuery, setSearchQuery] = useState('');
  const [chartType, setChartType] = useState('pie');
  const [activeSource, setActiveSource] = useState('golden'); // 'golden', 'erp', 'crm', 'claims'

  // Remove the handleCustomerChange function since we no longer need it

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleChartTypeChange = (event, newChartType) => {
    if (newChartType !== null) {
      setChartType(newChartType);
    }
  };

  const handleSourceChange = (event, newSource) => {
    if (newSource !== null) {
      setActiveSource(newSource);
    }
  };

  // Get the current personnel data based on the selected source
  const getCurrentPersonnelView = () => {
    if (activeSource === 'golden') {
      return selectedPersonnel;
    } else {
      const sourceData = selectedPersonnel.sourceRecords[activeSource];
      return {
        ...selectedPersonnel,
        name: sourceData.name,
        email: sourceData.email,
        phone: sourceData.phone,
        location: sourceData.location,
        sourceInfo: sourceData
      };
    }
  };

  const currentPersonnelView = getCurrentPersonnelView();

  // Sample chart elements (in a real implementation, we'd use a charting library)
  const renderBarChart = () => (
    <Box sx={{ height: 220, mt: 2, position: 'relative' }}>
      <Box sx={{ 
        display: 'flex', 
        height: '100%', 
        alignItems: 'flex-end', 
        justifyContent: 'space-around',
        px: 2 
      }}>
        {selectedPersonnel.claims.map((claim, index) => (
          <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box 
              sx={{ 
                width: 40, 
                height: `${(parseFloat(claim.amount.replace(/[$,]/g, '')) / 10000) * 100}%`, 
                bgcolor: index === 0 ? 'primary.main' : index === 1 ? 'secondary.main' : 'success.main',
                borderRadius: 1,
                minHeight: 30
              }} 
            />
            <Typography variant="caption" sx={{ mt: 1, width: 70, textAlign: 'center' }}>
              {claim.type.split(' ')[0]}
            </Typography>
          </Box>
        ))}
      </Box>
      <Typography variant="caption" sx={{ position: 'absolute', top: 0, right: 0 }}>
        Claims by Type
      </Typography>
    </Box>
  );

  const renderLineChart = () => (
    <Box sx={{ height: 220, mt: 2, position: 'relative' }}>
      <Box sx={{ 
        display: 'flex', 
        height: '100%', 
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 2,
        position: 'relative'
      }}>
        <svg width="100%" height="100%" viewBox="0 0 300 200">
          <polyline
            points="0,180 100,100 200,130 300,60"
            style={{ fill: 'none', stroke: '#1976d2', strokeWidth: 3 }}
          />
          <circle cx="0" cy="180" r="5" fill="#1976d2" />
          <circle cx="100" cy="100" r="5" fill="#1976d2" />
          <circle cx="200" cy="130" r="5" fill="#1976d2" />
          <circle cx="300" cy="60" r="5" fill="#1976d2" />
        </svg>
      </Box>
      <Typography variant="caption" sx={{ position: 'absolute', top: 0, right: 0 }}>
        Claims History (Past 3 Years)
      </Typography>
    </Box>
  );

  const renderPieChart = () => (
    <Box sx={{ height: 220, mt: 2, position: 'relative', display: 'flex', justifyContent: 'center' }}>
      <svg width="200" height="200" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f0f0f0" strokeWidth="20" />
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1976d2" strokeWidth="20" 
          strokeDasharray="251.2" strokeDashoffset="0" transform="rotate(-90 50 50)" />
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#9c27b0" strokeWidth="20" 
          strokeDasharray="62.8" strokeDashoffset="-188.4" transform="rotate(-90 50 50)" />
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#4caf50" strokeWidth="20" 
          strokeDasharray="37.68" strokeDashoffset="-125.6" transform="rotate(-90 50 50)" />
      </svg>
      <Box sx={{ position: 'absolute', top: 0, right: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 12, height: 12, bgcolor: 'primary.main', borderRadius: '50%' }} />
          <Typography variant="caption">Property (40%)</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 12, height: 12, bgcolor: 'secondary.main', borderRadius: '50%' }} />
          <Typography variant="caption">Medical (35%)</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 12, height: 12, bgcolor: 'success.main', borderRadius: '50%' }} />
          <Typography variant="caption">Liability (25%)</Typography>
        </Box>
      </Box>
    </Box>
  );

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return renderBarChart();
      case 'line':
        return renderLineChart();
      case 'pie':
        return renderPieChart();
      default:
        return renderBarChart();
    }
  };

  return (
    <Box>
      {/* Simplified header without customer selection */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Master Data Management - Personnel Data 360
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Unified 360-degree view of personnel data from multiple enterprise systems with automatic reconciliation, matching, and merging to create a complete personnel profile.
        </Typography>
      </Box>

      {/* Remove the Integrated Data Sources section */}

      {/* Data source toggle */}
      <Box sx={{ mb: 3 }}>
        <ToggleButtonGroup
          value={activeSource}
          exclusive
          onChange={handleSourceChange}
          aria-label="data source view"
          size="small"
          sx={{ mb: 2 }}
        >
          <ToggleButton value="golden" aria-label="golden record">
            Golden Record
          </ToggleButton>
          <ToggleButton value="erp" aria-label="erp source">
            ERP (SAP/NetSuite)
          </ToggleButton>
          <ToggleButton value="crm" aria-label="crm source">
            Salesforce
          </ToggleButton>
          <ToggleButton value="claims" aria-label="claims source">
            Policy Admin Systems
          </ToggleButton>
        </ToggleButtonGroup>
        {activeSource !== 'golden' && (
          <Typography variant="caption" display="block" sx={{ mb: 1 }}>
            Viewing source data from {personnelData.dataSources[activeSource].name} • 
            Match confidence: {selectedPersonnel.sourceRecords[activeSource].matchConfidence}% • 
            Source ID: {selectedPersonnel.sourceRecords[activeSource].id}
          </Typography>
        )}
        {activeSource === 'golden' && (
          <Typography variant="caption" display="block" sx={{ mb: 1 }}>
            Viewing consolidated golden record • Data quality score: {selectedPersonnel.reconciliation.dataQualityScore}% • 
            Last consolidated: {selectedPersonnel.reconciliation.consolidationDate}
          </Typography>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <PersonIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{currentPersonnelView.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentPersonnelView.segment} Personnel
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <List dense sx={{ mb: 2 }}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'transparent', color: 'text.secondary' }}>
                      <EmailIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Email" 
                    secondary={currentPersonnelView.email} 
                    primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'transparent', color: 'text.secondary' }}>
                      <PhoneIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Phone" 
                    secondary={currentPersonnelView.phone} 
                    primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'transparent', color: 'text.secondary' }}>
                      <LocationOnIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Location" 
                    secondary={currentPersonnelView.location} 
                    primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                  />
                </ListItem>
                {activeSource === 'erp' && (
                  <>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'transparent', color: 'text.secondary' }}>
                          <AccountBalanceWalletIcon fontSize="small" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Account Balance" 
                        secondary={currentPersonnelView.sourceInfo.accountBalance} 
                        primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Personnel Since" 
                        secondary={currentPersonnelView.sourceInfo.customerSince} 
                        primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                        sx={{ ml: 9 }}
                      />
                    </ListItem>
                  </>
                )}
                {activeSource === 'crm' && (
                  <>
                    <ListItem>
                      <ListItemText 
                        primary="Industry" 
                        secondary={currentPersonnelView.sourceInfo.industry} 
                        primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                        sx={{ ml: 9 }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Territory" 
                        secondary={currentPersonnelView.sourceInfo.territory} 
                        primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                        sx={{ ml: 9 }}
                      />
                    </ListItem>
                  </>
                )}
                {activeSource === 'claims' && (
                  <>
                    <ListItem>
                      <ListItemText 
                        primary="Policy Number" 
                        secondary={currentPersonnelView.sourceInfo.policyNumber} 
                        primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                        sx={{ ml: 9 }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Policy Type" 
                        secondary={currentPersonnelView.sourceInfo.policyType} 
                        primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                        sx={{ ml: 9 }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Policy Period" 
                        secondary={`${currentPersonnelView.sourceInfo.policyStartDate} to ${currentPersonnelView.sourceInfo.policyEndDate}`} 
                        primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                        sx={{ ml: 9 }}
                      />
                    </ListItem>
                  </>
                )}
                {activeSource === 'golden' && (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'transparent', color: 'text.secondary' }}>
                        <AccountBalanceWalletIcon fontSize="small" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary="Lifetime Value" 
                      secondary={selectedPersonnel.lifetimeValue} 
                      primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                    />
                  </ListItem>
                )}
              </List>
              
              {activeSource === 'golden' && (
                <>
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Reconciliation Details
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" display="block" color="warning.main">
                      Conflicting Fields: {selectedPersonnel.reconciliation.conflictFields.join(', ')}
                    </Typography>
                    <Typography variant="caption" display="block" color="success.main">
                      Resolved Fields: {selectedPersonnel.reconciliation.resolvedFields.join(', ')}
                    </Typography>
                    <Typography variant="caption" display="block">
                      Matching Rules Applied: {selectedPersonnel.reconciliation.matchingRules.join(', ')}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="caption" fontWeight="bold">Reconciliation Process:</Typography>
                    <List dense disablePadding>
                      {selectedPersonnel.reconciliation.processingSteps.map((step, index) => (
                        <ListItem key={index} disablePadding sx={{ py: 0 }}>
                          <ListItemText 
                            primary={`${index + 1}. ${step}`} 
                            primaryTypographyProps={{ variant: 'caption' }}
                            sx={{ m: 0 }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </>
              )}
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" gutterBottom>
                Recent Activity
              </Typography>
              <List dense>
                {selectedPersonnel.recentActivity.map((activity) => (
                  <ListItem key={activity.id} disableGutters>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'transparent', color: 'text.secondary' }}>
                        <ShoppingCartIcon fontSize="small" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={`${activity.type} (${activity.id})`} 
                      secondary={`${activity.date} • ${activity.details} • Source: ${activity.source}`} 
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1">
                    Claims History & Analysis
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <TextField
                    placeholder="Search claims..."
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={searchQuery}
                    onChange={handleSearchChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                
                {renderPieChart()}
                
                <Typography variant="subtitle2" gutterBottom sx={{ mt: 4, mb: 2 }}>
                  Claims Details
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: 'action.hover' }}>
                        <TableCell>Claim ID</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Risk Level</TableCell>
                        <TableCell>Source</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedPersonnel.claims
                        .filter(claim => 
                          claim.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          claim.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          claim.id.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((claim) => {
                          return (
                            <TableRow key={claim.id}>
                              <TableCell>{claim.id}</TableCell>
                              <TableCell>{claim.date}</TableCell>
                              <TableCell>
                                <Chip 
                                  label={claim.type} 
                                  size="small" 
                                  variant="outlined"
                                  color={
                                    claim.type === 'Property Damage' ? 'primary' :
                                    claim.type === 'Medical' ? 'secondary' : 'success'
                                  }
                                />
                              </TableCell>
                              <TableCell>{claim.status}</TableCell>
                              <TableCell>{claim.amount}</TableCell>
                              <TableCell>
                                <Chip 
                                  label={claim.riskLevel} 
                                  size="small"
                                  color={
                                    claim.riskLevel === 'High' ? 'error' :
                                    claim.riskLevel === 'Medium' ? 'warning' : 'success'
                                  }
                                />
                              </TableCell>
                              <TableCell>{claim.source}</TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
} 