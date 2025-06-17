'use client';

import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  alpha,
  Link,
  LinearProgress
} from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import VerifiedIcon from '@mui/icons-material/Verified';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';

export default function OverviewView() {
  // Data sources
  const dataSources = [
    {
      name: 'Portfolio Management System',
      description: 'Central system for managing private equity portfolio companies',
      connectionStatus: 'Healthy',
      healthStatus: 'green',
      recordCount: 45231,
      icon: <StorageIcon />
    },
    {
      name: 'Investment Analytics Platform',
      description: 'Advanced analytics and performance tracking for portfolio companies',
      connectionStatus: 'Healthy',
      healthStatus: 'green',
      recordCount: 12890,
      icon: <StorageIcon />
    },
    {
      name: 'Risk Management Database',
      description: 'Risk assessment and monitoring for portfolio companies',
      connectionStatus: 'Healthy',
      healthStatus: 'green',
      recordCount: 23456,
      icon: <StorageIcon />
    },
    {
      name: 'Portco Performance Metrics',
      description: 'Key performance indicators and metrics for portfolio companies',
      connectionStatus: 'Healthy',
      healthStatus: 'green',
      recordCount: 15432,
      icon: <StorageIcon />
    },
    {
      name: 'Portco Financial Data',
      description: 'Financial statements and metrics for portfolio companies',
      connectionStatus: 'Needs Attention',
      healthStatus: 'amber',
      recordCount: 9823,
      icon: <StorageIcon />
    },
    {
      name: 'Portco Operational Data',
      description: 'Operational metrics and KPIs for portfolio companies',
      connectionStatus: 'Healthy',
      healthStatus: 'green',
      recordCount: 34567,
      icon: <StorageIcon />
    },
    {
      name: 'Deal Flow Management System',
      description: 'Pipeline and deal tracking for potential investments',
      connectionStatus: 'Healthy',
      healthStatus: 'green',
      recordCount: 234567,
      icon: <StorageIcon />
    },
    {
      name: 'Due Diligence Repository',
      description: 'Due diligence documents and analysis for potential investments',
      connectionStatus: 'Healthy',
      healthStatus: 'green',
      recordCount: 11234,
      icon: <StorageIcon />
    },
    {
      name: 'LP Reporting Portal',
      description: 'Limited Partner reporting and communications platform',
      connectionStatus: 'Needs Attention',
      healthStatus: 'amber',
      recordCount: 982345,
      icon: <StorageIcon />
    },
    {
      name: 'Compliance Monitoring System',
      description: 'Regulatory compliance and monitoring for portfolio companies',
      connectionStatus: 'Healthy',
      healthStatus: 'green',
      recordCount: 15432,
      icon: <StorageIcon />
    },
    {
      name: 'Market Intelligence Platform',
      description: 'Market research and competitive analysis tools',
      connectionStatus: 'Healthy',
      healthStatus: 'green',
      recordCount: 22345,
      icon: <StorageIcon />
    },
    {
      name: 'Portco Valuation Models',
      description: 'Financial models and valuation tools for portfolio companies',
      connectionStatus: 'Healthy',
      healthStatus: 'green',
      recordCount: 34567,
      icon: <StorageIcon />
    },
    {
      name: 'Portco ESG Metrics',
      description: 'Environmental, Social, and Governance metrics tracking',
      connectionStatus: 'Healthy',
      healthStatus: 'green',
      recordCount: 345678,
      icon: <StorageIcon />
    },
    {
      name: 'Portco Growth Analytics',
      description: 'Growth metrics and market expansion analysis',
      connectionStatus: 'Healthy',
      healthStatus: 'green',
      recordCount: 45678,
      icon: <StorageIcon />
    },
    {
      name: 'Portco Integration Tracking',
      description: 'Post-acquisition integration progress monitoring',
      connectionStatus: 'Healthy',
      healthStatus: 'green',
      recordCount: 33456,
      icon: <StorageIcon />
    },
    {
      name: 'Portco Exit Planning',
      description: 'Exit strategy and divestiture planning tools',
      connectionStatus: 'Healthy',
      healthStatus: 'green',
      recordCount: 22345,
      icon: <StorageIcon />
    },
    {
      name: 'Real-time Market Data',
      description: 'Real-time market data and financial indicators',
      connectionStatus: 'Healthy',
      healthStatus: 'green',
      recordCount: 55678,
      icon: <StorageIcon />
    },
    {
      name: 'Forecast Models',
      description: 'Financial forecasting and scenario analysis tools',
      connectionStatus: 'Healthy',
      healthStatus: 'green',
      recordCount: 123456,
      icon: <StorageIcon />
    }
  ];

  // Data quality rules
  const bronzeRules = [
    { name: 'Financial Data Timeliness', status: 'Active', type: 'System', progress: 100 },
    { name: 'Portco Data Completeness', status: 'Active', type: 'System', progress: 100 },
    { name: 'Financial Statement Format', status: 'Active', type: 'System', progress: 100 },
    { name: 'Valuation Model Validation', status: 'In Progress', type: 'System', progress: 72 }
  ];

  const silverRules = [
    { name: 'Company Name Standardization', status: 'Active', type: 'Business', progress: 100 },
    { name: 'Financial Metric Validation', status: 'Active', type: 'Business', progress: 100 },
    { name: 'Investment Date Format Check', status: 'Active', type: 'Business', progress: 100 },
    { name: 'Portco ID Validation', status: 'In Progress', type: 'Business', progress: 85 }
  ];

  const goldRules = [
    { name: 'Customer Golden Record', status: 'Active', type: 'Business', progress: 100 },
    { name: 'Policy Master Record', status: 'Active', type: 'Business', progress: 100 },
    { name: 'Claims Consolidated View', status: 'In Progress', type: 'Business', progress: 63 },
    { name: 'Cross-system Record Linking', status: 'In Progress', type: 'System', progress: 79 }
  ];

  // Metrics
  const metrics = {
    bronze: {
      records: '8.2M',
      batchProcessingTime: '42 min',
      issues: 26458,
      resolvedIssues: 24531,
      progressPercentage: 92
    },
    silver: {
      records: '7.9M',
      batchProcessingTime: '1h 15min',
      issues: 14329,
      resolvedIssues: 12984,
      progressPercentage: 78
    },
    gold: {
      records: '7.8M',
      batchProcessingTime: '55 min',
      issues: 4892,
      resolvedIssues: 4518,
      progressPercentage: 84
    }
  };

  // Customer insights
  const customerInsights = {
    bronze: [
      "Identified 26,458 records with missing fields",
      "Flagged 4,128 potential duplicates",
      "Found 3,254 records with timestamp issues",
      "Detected 1,872 schema inconsistencies"
    ],
    silver: [
      "Standardized 458,932 customer names", 
      "Normalized 127,452 address formats",
      "Fixed 85,321 date format inconsistencies",
      "Validated 34,591 email addresses"
    ],
    gold: [
      "Created 120,458 customer golden records", 
      "Merged 58,321 duplicate customer profiles",
      "Linked 43,872 policies to customers",
      "Validated 15,932 customer relationships"
    ]
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Overview
      </Typography>

      {/* Data Capture & Ingestion */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Data Capture & Ingestion
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Connected enterprise systems and data sources
        </Typography>

        <Grid container spacing={2}>
          {dataSources.map((source, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ 
                      mr: 1, 
                      p: 1, 
                      borderRadius: 1, 
                      bgcolor: 'primary.main',
                      color: 'white',
                      display: 'flex'
                    }}>
                      {source.icon}
                    </Box>
                    <Box>
                    <Typography variant="subtitle2">{source.name}</Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {source.description}
                      </Typography>
                    </Box>
                    <Chip 
                      label={source.connectionStatus} 
                      size="small" 
                      color={
                        source.healthStatus === 'green' ? 'success' :
                        source.healthStatus === 'amber' ? 'warning' : 'error'
                      }
                      sx={{ ml: 'auto' }}
                    />
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="caption" display="block">
                    Records: {source.recordCount.toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Data Processing Lifecycle */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Data Quality Pipeline
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Automated data processing and quality management across bronze, silver, and gold data layers
        </Typography>

        <Grid container spacing={3}>
          {/* Bronze Layer */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                height: '100%', 
                border: '1px solid', 
                borderColor: 'divider',
                borderRadius: 2,
                bgcolor: alpha('#FFA000', 0.05),
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '6px', 
                bgcolor: '#FFA000' 
              }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ color: '#FFA000', mb: 1 }}>Bronze</Typography>
                <Button 
                  size="small" 
                  variant="outlined" 
                  color="inherit" 
                  endIcon={<AssessmentIcon />}
                  component={Link}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelectorAll('[role=tab]')[5].click();
                  }}
                >
                  Quality Details
                </Button>
              </Box>
              
              <Box sx={{ mt: 2, mb: 3 }}>
                <Typography variant="body2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  Data Processing Status
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ flexGrow: 1, mr: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={metrics.bronze.progressPercentage} 
                      color="warning"
                      sx={{ height: 8, borderRadius: 2 }}
                    />
                  </Box>
                  <Typography variant="caption" fontWeight="bold">
                    {metrics.bronze.progressPercentage}%
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    Issues: {metrics.bronze.issues.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="success.main">
                    Resolved: {metrics.bronze.resolvedIssues.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
              
              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Data Quality Rules</Typography>
              <List dense disablePadding>
                {bronzeRules.map((rule, index) => (
                  <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: '30px' }}>
                      {rule.status === 'Active' ? (
                        <CheckCircleIcon color="success" fontSize="small" />
                      ) : (
                        <AutorenewIcon color="warning" fontSize="small" />
                      )}
                    </ListItemIcon>
                    <ListItemText 
                      primary={rule.name} 
                      secondary={rule.type}
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                    <Chip 
                      label={rule.status} 
                      size="small" 
                      color={rule.status === 'Active' ? 'success' : 'warning'} 
                    />
                  </ListItem>
                ))}
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Records</Typography>
                  <Typography variant="subtitle2">{metrics.bronze.records}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Batch Processing Time</Typography>
                  <Typography variant="subtitle2">{metrics.bronze.batchProcessingTime}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Silver Layer */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                height: '100%', 
                border: '1px solid', 
                borderColor: 'divider',
                borderRadius: 2,
                bgcolor: alpha('#9E9E9E', 0.05),
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '6px', 
                bgcolor: '#9E9E9E' 
              }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ color: '#9E9E9E', mb: 1 }}>Silver</Typography>
                <Button 
                  size="small" 
                  variant="outlined" 
                  color="inherit" 
                  endIcon={<AssessmentIcon />}
                  component={Link}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelectorAll('[role=tab]')[5].click();
                  }}
                >
                  Quality Details
                </Button>
              </Box>
              
              <Box sx={{ mt: 2, mb: 3 }}>
                <Typography variant="body2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  Data Processing Status
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ flexGrow: 1, mr: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={metrics.silver.progressPercentage} 
                      color="primary"
                      sx={{ height: 8, borderRadius: 2 }}
                    />
                  </Box>
                  <Typography variant="caption" fontWeight="bold">
                    {metrics.silver.progressPercentage}%
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    Issues: {metrics.silver.issues.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="success.main">
                    Resolved: {metrics.silver.resolvedIssues.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
              
              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Business Data Quality Rules</Typography>
              <List dense disablePadding>
                {silverRules.map((rule, index) => (
                  <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: '30px' }}>
                      {rule.status === 'Active' ? (
                        <CheckCircleIcon color="success" fontSize="small" />
                      ) : (
                        <AutorenewIcon color="warning" fontSize="small" />
                      )}
                    </ListItemIcon>
                    <ListItemText 
                      primary={rule.name} 
                      secondary={rule.type}
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                    <Chip 
                      label={rule.status} 
                      size="small" 
                      color={rule.status === 'Active' ? 'success' : 'warning'} 
                    />
                  </ListItem>
                ))}
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Records</Typography>
                  <Typography variant="subtitle2">{metrics.silver.records}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Batch Processing Time</Typography>
                  <Typography variant="subtitle2">{metrics.silver.batchProcessingTime}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Gold Layer */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                height: '100%', 
                border: '1px solid', 
                borderColor: 'divider',
                borderRadius: 2,
                bgcolor: alpha('#FFD700', 0.05),
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '6px', 
                bgcolor: '#FFD700' 
              }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ color: '#FFD700', mb: 1 }}>Gold</Typography>
                <Button 
                  size="small" 
                  variant="outlined" 
                  color="inherit" 
                  endIcon={<AssessmentIcon />}
                  component={Link}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelectorAll('[role=tab]')[5].click();
                  }}
                >
                  Quality Details
                </Button>
              </Box>
              
              <Box sx={{ mt: 2, mb: 3 }}>
                <Typography variant="body2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  Data Processing Status
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ flexGrow: 1, mr: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={metrics.gold.progressPercentage} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 2,
                        bgcolor: alpha('#FFD700', 0.2),
                        '& .MuiLinearProgress-bar': {
                          bgcolor: '#FFD700'
                        }
                      }}
                    />
                  </Box>
                  <Typography variant="caption" fontWeight="bold">
                    {metrics.gold.progressPercentage}%
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    Issues: {metrics.gold.issues.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="success.main">
                    Resolved: {metrics.gold.resolvedIssues.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
              
              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>MDM Match & Merge Process</Typography>
              <List dense disablePadding>
                {goldRules.map((rule, index) => (
                  <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: '30px' }}>
                      {rule.status === 'Active' ? (
                        <CheckCircleIcon color="success" fontSize="small" />
                      ) : (
                        <AutorenewIcon color="warning" fontSize="small" />
                      )}
                    </ListItemIcon>
                    <ListItemText 
                      primary={rule.name} 
                      secondary={rule.type}
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                    <Chip 
                      label={rule.status} 
                      size="small" 
                      color={rule.status === 'Active' ? 'success' : 'warning'} 
                    />
                  </ListItem>
                ))}
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Records</Typography>
                  <Typography variant="subtitle2">{metrics.gold.records}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Batch Processing Time</Typography>
                  <Typography variant="subtitle2">{metrics.gold.batchProcessingTime}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
} 