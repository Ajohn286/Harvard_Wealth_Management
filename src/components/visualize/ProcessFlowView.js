'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Tooltip
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PaidIcon from '@mui/icons-material/Paid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// Mock process flow data for investment management
const processFlowData = {
  flowTypes: ['Deal Flow Process', 'Portco Integration', 'Exit Strategy'],
  claimsFlow: {
    name: 'Deal Flow Process',
    description: 'End-to-end flow of an investment opportunity from sourcing to closing',
    steps: [
      {
        id: 'deal_sourcing',
        name: 'Deal Sourcing',
        description: 'Initial identification and screening of investment opportunities',
        icon: <PersonIcon />,
        status: 'completed',
        timestamp: '2023-10-15 09:15:32',
        duration: '10 minutes',
        metrics: {
          volume: 1250,
          avgCompletionTime: '8 minutes',
          errorRate: '3%'
        },
        dataCompleteness: {
          percentage: 92,
          missingElements: [
            { field: 'Market Analysis', count: 145, impact: 'Medium' },
            { field: 'Competitive Landscape', count: 78, impact: 'Low' }
          ],
          requiredFields: ['Company ID', 'Deal Date', 'Industry Code', 'Financials', 'Management Team'],
          completedFields: ['Company ID', 'Deal Date', 'Industry Code', 'Financials', 'Management Team'],
          optionalFields: ['Market Analysis', 'Competitive Landscape', 'Additional Notes']
        },
        entities: [
          { type: 'Company', id: 'CO12345', name: 'Tech Innovators Inc' },
          { type: 'Deal', id: 'DL54321', value: '$50M' }
        ],
        documents: [
          { name: 'Deal Memo', id: 'DOC-001', size: '2.3 MB' }
        ]
      },
      {
        id: 'due_diligence',
        name: 'Due Diligence',
        description: 'Comprehensive analysis of investment opportunity',
        icon: <ReceiptLongIcon />,
        status: 'completed',
        timestamp: '2023-10-15 09:25:45',
        duration: '15 minutes',
        metrics: {
          volume: 1250,
          avgCompletionTime: '12 minutes',
          errorRate: '8%'
        },
        dataCompleteness: {
          percentage: 78,
          missingElements: [
            { field: 'Legal Review', count: 245, impact: 'High' },
            { field: 'Financial Projections', count: 189, impact: 'Medium' },
            { field: 'Market Size', count: 115, impact: 'Low' }
          ],
          requiredFields: ['Financial Statements', 'Legal Documents', 'Market Analysis', 'Management Background', 'Risk Assessment'],
          completedFields: ['Financial Statements', 'Legal Documents', 'Management Background'],
          optionalFields: ['Financial Projections', 'Market Size', 'Competitive Analysis']
        },
        entities: [
          { type: 'Company', id: 'CO12345', name: 'Tech Innovators Inc' },
          { type: 'Deal', id: 'DL54321', value: '$50M' }
        ],
        issues: [
          { type: 'warning', message: 'Missing financial projections', count: 2 }
        ]
      },
      {
        id: 'investment_committee',
        name: 'Investment Committee Review',
        description: 'Review and approval by investment committee',
        icon: <LocalHospitalIcon />,
        status: 'completed',
        timestamp: '2023-10-15 09:45:22',
        duration: '20 minutes',
        metrics: {
          volume: 1200,
          avgCompletionTime: '18 minutes',
          errorRate: '5%'
        },
        dataCompleteness: {
          percentage: 85,
          missingElements: [
            { field: 'Committee Notes', count: 126, impact: 'Medium' },
            { field: 'Approval Status', count: 42, impact: 'High' }
          ],
          requiredFields: ['Committee Members', 'Voting Record', 'Approval Status', 'Investment Terms', 'Risk Assessment'],
          completedFields: ['Committee Members', 'Voting Record', 'Investment Terms', 'Risk Assessment'],
          optionalFields: ['Committee Notes', 'Follow-up Actions', 'Timeline']
        },
        entities: [
          { type: 'Deal', id: 'DL54321', value: '$50M' },
          { type: 'Committee', id: 'IC98765', name: 'Investment Committee' }
        ]
      },
      {
        id: 'deal_negotiation',
        name: 'Deal Negotiation',
        description: 'Finalize terms and conditions of investment',
        icon: <ReceiptLongIcon />,
        status: 'in_progress',
        timestamp: '2023-10-15 10:15:30',
        duration: '30 minutes (in progress)',
        metrics: {
          volume: 1150,
          avgCompletionTime: '35 minutes',
          errorRate: '10%'
        },
        dataCompleteness: {
          percentage: 62,
          missingElements: [
            { field: 'Term Sheet', count: 324, impact: 'Critical' },
            { field: 'Valuation Model', count: 217, impact: 'High' },
            { field: 'Investment Structure', count: 185, impact: 'High' },
            { field: 'Exit Strategy', count: 156, impact: 'Medium' }
          ],
          requiredFields: ['Term Sheet', 'Valuation Model', 'Investment Structure', 'Exit Strategy', 'Governance Terms'],
          completedFields: ['Governance Terms'],
          optionalFields: ['Additional Clauses', 'Special Conditions', 'Milestone Payments']
        },
        entities: [
          { type: 'Deal', id: 'DL54321', value: '$50M' },
          { type: 'Term Sheet', id: 'TS98765', status: 'Draft' }
        ],
        issues: [
          { type: 'error', message: 'Valuation not agreed', count: 1 }
        ]
      },
      {
        id: 'closing',
        name: 'Deal Closing',
        description: 'Finalize and execute investment agreement',
        icon: <PaidIcon />,
        status: 'pending',
        timestamp: 'Pending',
        duration: 'Pending',
        metrics: {
          volume: 1050,
          avgCompletionTime: '20 minutes',
          errorRate: '2%'
        },
        dataCompleteness: {
          percentage: 40,
          missingElements: [
            { field: 'Closing Documents', count: 385, impact: 'Critical' },
            { field: 'Payment Schedule', count: 298, impact: 'High' },
            { field: 'Legal Approvals', count: 246, impact: 'Medium' },
            { field: 'Bank Details', count: 198, impact: 'High' }
          ],
          requiredFields: ['Closing Documents', 'Payment Schedule', 'Legal Approvals', 'Bank Details', 'Signatures'],
          completedFields: ['Signatures', 'Legal Approvals'],
          optionalFields: ['Additional Agreements', 'Post-Closing Actions', 'Integration Plan']
        },
        entities: [
          { type: 'Deal', id: 'DL54321', value: '$50M' },
          { type: 'Closing', id: 'CL00000', status: 'Pending' }
        ]
      }
    ]
  }
};

export default function ProcessFlowView() {
  const [flowType, setFlowType] = useState('Claims Processing');
  const [selectedStep, setSelectedStep] = useState(processFlowData.claimsFlow.steps[0]);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  const handleFlowTypeChange = (event) => {
    setFlowType(event.target.value);
  };
  
  const handleStepClick = (step) => {
    setSelectedStep(step);
  };
  
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 1.8));
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.6));
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon color="success" />;
      case 'in_progress':
        return <ScheduleIcon color="primary" />;
      case 'pending':
        return <ScheduleIcon color="disabled" />;
      case 'error':
        return <ErrorIcon color="error" />;
      default:
        return <WarningIcon color="warning" />;
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success.main';
      case 'in_progress':
        return 'primary.main';
      case 'pending':
        return 'text.disabled';
      case 'error':
        return 'error.main';
      default:
        return 'warning.main';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Process Flow Visualization
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

          <Box>
            <IconButton onClick={handleZoomOut} size="small">
              <ZoomOutIcon />
            </IconButton>
            <IconButton onClick={handleZoomIn} size="small">
              <ZoomInIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>



      <Box sx={{ mb: 4 }}>
        <Paper 
          sx={{ 
            p: 2,
            overflowX: 'auto',
            minHeight: 180,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'left center',
            transition: 'transform 0.3s ease',
            px: 2,
            py: 3,
            width: 'max-content'
          }}>
            {processFlowData.claimsFlow.steps.map((step, index) => (
              <Box 
                key={step.id} 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => handleStepClick(step)}
              >
                <Paper 
                  elevation={selectedStep.id === step.id ? 3 : 1}
                  sx={{ 
                    p: 2, 
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: 150,
                    border: selectedStep.id === step.id ? 2 : 0,
                    borderColor: 'primary.main',
                    bgcolor: selectedStep.id === step.id ? 'rgba(25, 118, 210, 0.08)' : 'background.paper'
                  }}
                >
                  <Avatar 
                    sx={{ 
                      bgcolor: getStatusColor(step.status),
                      mb: 1,
                      width: 48,
                      height: 48
                    }}
                  >
                    {step.icon}
                  </Avatar>
                  <Typography variant="subtitle2" align="center" gutterBottom>
                    {step.name}
                  </Typography>
                  <Chip 
                    icon={getStatusIcon(step.status)} 
                    label={step.status.replace('_', ' ')}
                    size="small"
                    color={
                      step.status === 'completed' ? 'success' :
                      step.status === 'in_progress' ? 'primary' :
                      step.status === 'error' ? 'error' : 'default'
                    }
                    variant="outlined"
                  />
                  <Box sx={{ mt: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      Data Completeness
                    </Typography>
                    <Box sx={{ width: '100%', mt: 0.5, px: 1 }}>
                      <Box sx={{ 
                        width: '100%', 
                        height: 6, 
                        bgcolor: 'grey.200', 
                        borderRadius: 3,
                        position: 'relative' 
                      }}>
                        <Box 
                          sx={{ 
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            height: '100%',
                            width: `${step.dataCompleteness.percentage}%`,
                            bgcolor: 
                              step.dataCompleteness.percentage > 80 ? 'success.main' :
                              step.dataCompleteness.percentage > 60 ? 'warning.main' : 'error.main',
                            borderRadius: 3
                          }}
                        />
                      </Box>
                    </Box>
                    <Typography variant="caption" color="text.secondary" mt={0.5}>
                      {step.dataCompleteness.percentage}%
                    </Typography>
                  </Box>
                </Paper>
                {index < processFlowData.claimsFlow.steps.length - 1 && (
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    py: 1,
                    color: step.status === 'completed' ? 'success.main' : 'text.disabled',
                    mx: 3
                  }}>
                    <ArrowForwardIcon />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  {selectedStep.name} - Data Completeness Analysis
                </Typography>
                <Chip 
                  icon={getStatusIcon(selectedStep.status)} 
                  label={selectedStep.status.replace('_', ' ')}
                  size="small"
                  color={
                    selectedStep.status === 'completed' ? 'success' :
                    selectedStep.status === 'in_progress' ? 'primary' :
                    selectedStep.status === 'error' ? 'error' : 'default'
                  }
                />
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                {selectedStep.description}
              </Typography>


              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2">Overall Completeness</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {selectedStep.dataCompleteness.percentage}%
                  </Typography>
                </Box>
                <Box sx={{ width: '100%', height: 8, bgcolor: 'grey.200', borderRadius: 4 }}>
                  <Box 
                    sx={{ 
                      height: '100%', 
                      width: `${selectedStep.dataCompleteness.percentage}%`,
                      bgcolor: 
                        selectedStep.dataCompleteness.percentage > 80 ? 'success.main' :
                        selectedStep.dataCompleteness.percentage > 60 ? 'warning.main' : 'error.main',
                      borderRadius: 4
                    }}
                  />
                </Box>
              </Box>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Required Data Elements
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <List dense disablePadding>
                      {selectedStep.dataCompleteness.requiredFields.map((field, idx) => (
                        <ListItem key={idx} disablePadding sx={{ py: 0.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <Box 
                              sx={{ 
                                width: 10, 
                                height: 10, 
                                borderRadius: '50%', 
                                mr: 1,
                                bgcolor: selectedStep.dataCompleteness.completedFields.includes(field) 
                                  ? 'success.main' 
                                  : 'error.main'
                              }} 
                            />
                            <Typography variant="body2">
                              {field}
                            </Typography>
                            {!selectedStep.dataCompleteness.completedFields.includes(field) && (
                              <Chip 
                                label="Missing" 
                                size="small" 
                                color="error" 
                                variant="outlined" 
                                sx={{ ml: 'auto' }}
                              />
                            )}
                          </Box>
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Optional Data Elements
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <List dense disablePadding>
                      {selectedStep.dataCompleteness.optionalFields.map((field, idx) => (
                        <ListItem key={idx} disablePadding sx={{ py: 0.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <Box 
                              sx={{ 
                                width: 10, 
                                height: 10, 
                                borderRadius: '50%', 
                                mr: 1,
                                bgcolor: selectedStep.dataCompleteness.completedFields.includes(field) 
                                  ? 'success.main' 
                                  : 'warning.main'
                              }} 
                            />
                            <Typography variant="body2">
                              {field}
                            </Typography>
                            {!selectedStep.dataCompleteness.completedFields.includes(field) && (
                              <Chip 
                                label="Incomplete" 
                                size="small" 
                                color="warning" 
                                variant="outlined" 
                                sx={{ ml: 'auto' }}
                              />
                            )}
                          </Box>
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Grid>
              </Grid>
              
              <Typography variant="subtitle2" gutterBottom>
                Critical Missing Data
              </Typography>
              <Paper variant="outlined" sx={{ mb: 2 }}>
                <List dense>
                  {selectedStep.dataCompleteness.missingElements.map((element, idx) => (
                    <ListItem key={idx} divider={idx < selectedStep.dataCompleteness.missingElements.length - 1}>
                      <ListItemText
                        primary={element.field}
                        secondary={`${element.count} records affected`}
                        primaryTypographyProps={{ fontWeight: 'medium' }}
                      />
                      <Chip 
                        label={element.impact} 
                        size="small" 
                        color={
                          element.impact === 'Critical' ? 'error' :
                          element.impact === 'High' ? 'warning' :
                          element.impact === 'Medium' ? 'info' : 'default'
                        }
                        sx={{ ml: 1 }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" size="small" startIcon={<InfoOutlinedIcon />}>
                  View Industry Schema Documentation
                </Button>
                <Button variant="contained" size="small">
                  Set Up Automated Data Validation
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 