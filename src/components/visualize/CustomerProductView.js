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

// Mock portfolio company data
const supplierData = {
  overview: {
    totalPortcos: 3200,
    activePortcos: 2780,
    inactivePortcos: 420,
    averageInvestmentValue: '$125,000,000',
    topSector: 'Technology',
    recentInvestments: 112
  },
  dataSources: {
    financial: {
      name: 'Financial Systems',
      sources: ['Portfolio Management System', 'Investment Analytics Platform'],
      lastUpdated: '2023-10-21 08:45 AM',
      recordCount: 3124,
      status: 'Connected',
      confidence: 93,
    },
    operational: {
      name: 'Operational Systems',
      sources: ['Portco Performance Metrics', 'Portco Operational Data'],
      lastUpdated: '2023-10-21 09:30 AM',
      recordCount: 2987,
      status: 'Connected',
      confidence: 95,
    },
    compliance: {
      name: 'Compliance Systems',
      sources: ['Compliance Monitoring System', 'ESG Metrics'],
      lastUpdated: '2023-10-20 06:15 PM',
      recordCount: 2890,
      status: 'Connected',
      confidence: 91,
    }
  },
  suppliers: [
    {
      id: 'PCO-00123',
      companyName: 'Tech Innovators Inc.',
      contact: {
        name: 'Alice Johnson',
        email: 'alice.johnson@techinnovators.com',
        phone: '(555) 321-9876',
        location: 'San Francisco, CA'
      },
      sector: 'Technology',
      investmentValue: '$250,000,000',
      status: 'Active',
      complianceStatus: 'Compliant',
      riskScore: 'Low',
      sourceRecords: {
        financial: {
          source: 'Portfolio Management System',
          id: 'PMS-200123',
          companyName: 'Tech Innovators Inc.',
          contact: 'Alice Johnson',
          email: 'alice.johnson@techinnovators.com',
          phone: '(555) 321-9876',
          location: 'San Francisco, CA',
          investmentValue: '$250,000,000',
          lastValuation: '2023-09-10',
          investmentDate: '2015-03-22',
          matchConfidence: 98,
          variants: ['Tech Innovators', 'Tech Innovators Inc'],
          sector: 'Technology'
        },
        operational: {
          source: 'Portco Performance Metrics',
          id: 'PPM-90012',
          companyName: 'Tech Innovators Inc.',
          contact: 'Alice Johnson',
          email: 'alice.johnson@techinnovators.com',
          phone: '(555) 321-9876',
          location: 'San Francisco, CA',
          investmentId: 'INV-2023-001',
          investmentValue: '$250,000,000',
          complianceStatus: 'Compliant',
          matchConfidence: 97,
          lastReporting: '2023-09-10',
          status: 'Active'
        },
        compliance: {
          source: 'Compliance Monitoring System',
          id: 'CMS-123456',
          companyName: 'Tech Innovators Inc.',
          contact: 'Alice Johnson',
          email: 'alice.johnson@techinnovators.com',
          phone: '(555) 321-9876',
          location: 'San Francisco, CA',
          complianceStatus: 'Compliant',
          matchConfidence: 96,
          investmentDate: '2015-03-15',
          status: 'Active'
        }
      },
      reconciliation: {
        conflictFields: ['companyName', 'location'],
        resolvedFields: ['email', 'phone'],
        matchingRules: ['Email Exact Match', 'Company Name Fuzzy Match'],
        consolidationDate: '2023-10-18',
        goldenRecord: true,
        dataQualityScore: 95,
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
        { id: 'INV-2023-001', type: 'Investment Made', date: '2023-09-10', details: 'Series C funding round', source: 'Portfolio Management System' },
        { id: 'CMP-2023-002', type: 'Compliance Check', date: '2023-08-15', details: 'ESG compliance verified', source: 'Compliance Monitoring System' },
        { id: 'UPD-2023-003', type: 'Profile Update', date: '2023-07-20', details: 'Financial metrics updated', source: 'Investment Analytics Platform' }
      ],
      investments: [
        {
          id: 'INV-2023-001',
          date: '2023-09-10',
          type: 'Series C',
          status: 'Active',
          value: '$250,000,000',
          fund: 'Growth Fund III',
          riskLevel: 'Low',
          complianceStatus: 'Compliant'
        },
        {
          id: 'INV-2022-015',
          date: '2022-06-18',
          type: 'Series B',
          status: 'Completed',
          value: '$120,000,000',
          fund: 'Growth Fund II',
          riskLevel: 'Medium',
          complianceStatus: 'Compliant'
        },
        {
          id: 'INV-2021-008',
          date: '2021-03-12',
          type: 'Series A',
          status: 'Completed',
          value: '$80,000,000',
          fund: 'Growth Fund I',
          riskLevel: 'Low',
          complianceStatus: 'Compliant'
        }
      ]
    }
  ]
};

export default function PortfolioCompanyView() {
  // Always use Tech Innovators Inc. (first portfolio company) and remove the ability to select companies
  const selectedPortco = supplierData.suppliers[0];
  const [searchQuery, setSearchQuery] = useState('');
  const [chartType, setChartType] = useState('pie');
  const [activeSource, setActiveSource] = useState('golden'); // 'golden', 'financial', 'operational', 'compliance'

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

  // Get the current portfolio company data based on the selected source
  const getCurrentPortcoView = () => {
    if (activeSource === 'golden') {
      return selectedPortco;
    } else {
      const sourceData = selectedPortco.sourceRecords[activeSource];
      if (!sourceData) return selectedPortco; // fallback to golden if missing
      return {
        ...selectedPortco,
        companyName: sourceData.companyName,
        contact: {
          name: sourceData.contact,
          email: sourceData.email,
          phone: sourceData.phone,
          location: sourceData.location
        },
        investmentValue: sourceData.investmentValue,
        complianceStatus: sourceData.complianceStatus,
        sourceInfo: sourceData
      };
    }
  };

  const currentPortcoView = getCurrentPortcoView();

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
        {selectedPortco.investments.map((investment, index) => (
          <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box 
              sx={{ 
                width: 40, 
                height: `${(parseFloat(investment.value.replace(/[$,]/g, '')) / 1000000) * 100}%`, 
                bgcolor: index === 0 ? 'primary.main' : index === 1 ? 'secondary.main' : 'success.main',
                borderRadius: 1,
                minHeight: 30
              }} 
            />
            <Typography variant="caption" sx={{ mt: 1, width: 70, textAlign: 'center' }}>
              {investment.type}
            </Typography>
          </Box>
        ))}
      </Box>
      <Typography variant="caption" sx={{ position: 'absolute', top: 0, right: 0 }}>
        Investments by Type
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
        Investment History (Past 3 Years)
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
          <Typography variant="caption">Series C (40%)</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 12, height: 12, bgcolor: 'secondary.main', borderRadius: '50%' }} />
          <Typography variant="caption">Series B (35%)</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 12, height: 12, bgcolor: 'success.main', borderRadius: '50%' }} />
          <Typography variant="caption">Series A (25%)</Typography>
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
      {/* Simplified header without portfolio company selection */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Master Data Management - Portfolio Company Data 360
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Unified 360-degree view of portfolio company data from multiple enterprise systems with automatic reconciliation, matching, and merging to create a complete portfolio company profile.
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
          <ToggleButton value="financial" aria-label="financial source">
            Portfolio Management System
          </ToggleButton>
          <ToggleButton value="operational" aria-label="operational source">
            Portco Performance Metrics
          </ToggleButton>
          <ToggleButton value="compliance" aria-label="compliance source">
            Compliance Monitoring System
          </ToggleButton>
        </ToggleButtonGroup>
        {activeSource !== 'golden' && (
          <Typography variant="caption" display="block" sx={{ mb: 1 }}>
            Viewing source data from {supplierData.dataSources[activeSource]?.name} •
            Match confidence: {currentPortcoView.sourceInfo?.matchConfidence ?? '--'}% •
            Source ID: {currentPortcoView.sourceInfo?.id ?? '--'}
          </Typography>
        )}
        {activeSource === 'golden' && (
          <Typography variant="caption" display="block" sx={{ mb: 1 }}>
            Viewing consolidated golden record • Data quality score: {selectedPortco.reconciliation.dataQualityScore}% • 
            Last consolidated: {selectedPortco.reconciliation.consolidationDate}
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
                  <Typography variant="h6">{currentPortcoView.companyName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentPortcoView.sector} Portfolio Company
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
                    secondary={currentPortcoView.contact.email} 
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
                    secondary={currentPortcoView.contact.phone} 
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
                    secondary={currentPortcoView.contact.location} 
                    primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                  />
                </ListItem>
                {activeSource === 'financial' && (
                  <>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'transparent', color: 'text.secondary' }}>
                          <AccountBalanceWalletIcon fontSize="small" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Investment Value" 
                        secondary={currentPortcoView.investmentValue} 
                        primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Last Valuation" 
                        secondary={currentPortcoView.sourceInfo.lastValuation} 
                        primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                        sx={{ ml: 9 }}
                      />
                    </ListItem>
                  </>
                )}
                {activeSource === 'operational' && (
                  <>
                    <ListItem>
                      <ListItemText 
                        primary="Investment ID" 
                        secondary={currentPortcoView.sourceInfo.investmentId} 
                        primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                        sx={{ ml: 9 }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Last Reporting" 
                        secondary={currentPortcoView.sourceInfo.lastReporting} 
                        primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                        sx={{ ml: 9 }}
                      />
                    </ListItem>
                  </>
                )}
                {activeSource === 'compliance' && (
                  <>
                    <ListItem>
                      <ListItemText 
                        primary="Registration Date" 
                        secondary={currentPortcoView.sourceInfo.investmentDate} 
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
                      primary="Investment Value" 
                      secondary={selectedPortco.investmentValue} 
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
                      Conflicting Fields: {selectedPortco.reconciliation.conflictFields.join(', ')}
                    </Typography>
                    <Typography variant="caption" display="block" color="success.main">
                      Resolved Fields: {selectedPortco.reconciliation.resolvedFields.join(', ')}
                    </Typography>
                    <Typography variant="caption" display="block">
                      Matching Rules Applied: {selectedPortco.reconciliation.matchingRules.join(', ')}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="caption" fontWeight="bold">Reconciliation Process:</Typography>
                    <List dense disablePadding>
                      {selectedPortco.reconciliation.processingSteps.map((step, index) => (
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
                {selectedPortco.recentActivity.map((activity) => (
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
                    Investment History & Analysis
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <TextField
                    placeholder="Search investments..."
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
                  Investment Details
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: 'action.hover' }}>
                        <TableCell>Investment ID</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell>Risk Level</TableCell>
                        <TableCell>Fund</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedPortco.investments
                        .filter(investment => 
                          investment.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          investment.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          investment.id.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((investment) => {
                          return (
                            <TableRow key={investment.id}>
                              <TableCell>{investment.id}</TableCell>
                              <TableCell>{investment.date}</TableCell>
                              <TableCell>{investment.type}</TableCell>
                              <TableCell>{investment.status}</TableCell>
                              <TableCell>{investment.value}</TableCell>
                              <TableCell>
                                <Chip 
                                  label={investment.riskLevel} 
                                  size="small"
                                  color={
                                    investment.riskLevel === 'High' ? 'error' :
                                    investment.riskLevel === 'Medium' ? 'warning' : 'success'
                                  }
                                />
                              </TableCell>
                              <TableCell>{investment.fund}</TableCell>
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