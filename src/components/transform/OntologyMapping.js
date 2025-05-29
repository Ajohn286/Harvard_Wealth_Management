'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Tooltip,
  IconButton
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Mock ontology data
const ontologyData = {
  sourceSchemas: [
    {
      name: 'Claims Processing',
      fields: [
        { name: 'claim_id', type: 'string', mapped: true },
        { name: 'patient_name', type: 'string', mapped: true },
        { name: 'procedure_code', type: 'string', mapped: true },
        { name: 'claim_amount', type: 'number', mapped: true },
        { name: 'submitted_date', type: 'date', mapped: true },
        { name: 'provider_id', type: 'string', mapped: true },
        { name: 'insurance_id', type: 'string', mapped: true },
        { name: 'status', type: 'string', mapped: true }
      ]
    },
    {
      name: 'Customer Records',
      fields: [
        { name: 'customer_id', type: 'string', mapped: true },
        { name: 'full_name', type: 'string', mapped: true },
        { name: 'email', type: 'string', mapped: true },
        { name: 'phone', type: 'string', mapped: true },
        { name: 'address', type: 'string', mapped: true },
        { name: 'signup_date', type: 'date', mapped: true },
        { name: 'customer_segment', type: 'string', mapped: false },
        { name: 'account_status', type: 'string', mapped: true }
      ]
    }
  ],
  targetOntology: {
    entities: [
      {
        name: 'Person',
        description: 'Information about an individual',
        fields: [
          { name: 'personId', type: 'string' },
          { name: 'name', type: 'string' },
          { name: 'contactInfo', type: 'object' }
        ]
      },
      {
        name: 'Claim',
        description: 'Insurance claim information',
        fields: [
          { name: 'claimId', type: 'string' },
          { name: 'amount', type: 'number' },
          { name: 'submissionDate', type: 'date' },
          { name: 'status', type: 'string' }
        ]
      },
      {
        name: 'Provider',
        description: 'Healthcare provider information',
        fields: [
          { name: 'providerId', type: 'string' },
          { name: 'name', type: 'string' },
          { name: 'specialty', type: 'string' }
        ]
      }
    ],
    relationships: [
      { from: 'Person', to: 'Claim', type: 'SUBMITTED', cardinality: '1:N' },
      { from: 'Provider', to: 'Claim', type: 'PROCESSED', cardinality: '1:N' }
    ]
  },
  mappings: [
    { source: 'Claims Processing.claim_id', target: 'Claim.claimId', confidence: 100 },
    { source: 'Claims Processing.patient_name', target: 'Person.name', confidence: 95 },
    { source: 'Claims Processing.claim_amount', target: 'Claim.amount', confidence: 100 },
    { source: 'Claims Processing.submitted_date', target: 'Claim.submissionDate', confidence: 100 },
    { source: 'Claims Processing.status', target: 'Claim.status', confidence: 90 },
    { source: 'Claims Processing.provider_id', target: 'Provider.providerId', confidence: 100 },
    { source: 'Customer Records.customer_id', target: 'Person.personId', confidence: 98 },
    { source: 'Customer Records.full_name', target: 'Person.name', confidence: 95 },
    { source: 'Customer Records.email', target: 'Person.contactInfo', confidence: 100 },
    { source: 'Customer Records.phone', target: 'Person.contactInfo', confidence: 100 },
    { source: 'Customer Records.address', target: 'Person.contactInfo', confidence: 100 },
    { source: 'Customer Records.account_status', target: 'Claim.status', confidence: 80 }
  ]
};

export default function OntologyMapping() {
  const [showConfidence, setShowConfidence] = useState(true);
  const [selectedEntity, setSelectedEntity] = useState('Person');

  const handleToggleConfidence = () => {
    setShowConfidence(!showConfidence);
  };

  const handleEntityClick = (entity) => {
    setSelectedEntity(entity);
  };

  const getEntityMappings = (entityName) => {
    return ontologyData.mappings.filter(mapping => 
      mapping.target.startsWith(entityName)
    );
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 95) return 'success';
    if (confidence >= 80) return 'warning';
    return 'error';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Ontology Mapping
        </Typography>
        <FormControlLabel
          control={
            <Switch 
              checked={showConfidence} 
              onChange={handleToggleConfidence}
              size="small"
            />
          }
          label="Show confidence scores"
        />
      </Box>
      <Typography variant="body2" color="text.secondary" paragraph>
        Ontology mapping connects your source data fields to a standardized data model, enabling consistent analysis across different data sources.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <AccountTreeIcon fontSize="small" sx={{ mr: 1 }} />
              Target Ontology
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              The standardized data model
            </Typography>
            <List dense>
              {ontologyData.targetOntology.entities.map((entity) => (
                <ListItem 
                  key={entity.name}
                  button
                  selected={selectedEntity === entity.name}
                  onClick={() => handleEntityClick(entity.name)}
                  sx={{ 
                    borderRadius: 1,
                    mb: 1,
                    bgcolor: selectedEntity === entity.name ? 'action.selected' : 'transparent'
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Avatar 
                      sx={{ 
                        width: 24, 
                        height: 24, 
                        fontSize: '0.75rem', 
                        bgcolor: selectedEntity === entity.name ? 'primary.main' : 'action.disabledBackground' 
                      }}
                    >
                      {entity.name.charAt(0)}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText 
                    primary={entity.name} 
                    secondary={`${entity.fields.length} fields`}
                  />
                  <Tooltip title={entity.description}>
                    <IconButton size="small">
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" gutterBottom>
              Relationships
            </Typography>
            <List dense>
              {ontologyData.targetOntology.relationships.map((rel, idx) => (
                <ListItem key={idx}>
                  <ListItemText 
                    primary={`${rel.from} ${rel.type} ${rel.to}`} 
                    secondary={`Cardinality: ${rel.cardinality}`}
                    primaryTypographyProps={{ variant: 'body2' }}
                    secondaryTypographyProps={{ variant: 'caption' }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Mappings for {selectedEntity}
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Fields in target ontology:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {ontologyData.targetOntology.entities
                  .find(e => e.name === selectedEntity)?.fields
                  .map((field) => (
                    <Chip 
                      key={field.name} 
                      label={field.name} 
                      size="small" 
                      variant="outlined"
                    />
                  ))}
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle2" gutterBottom>
              Source to Target Mappings
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {getEntityMappings(selectedEntity).map((mapping, idx) => (
                <Grid item xs={12} key={idx}>
                  <Card variant="outlined" sx={{ bgcolor: 'background.default' }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', py: 1.5, '&:last-child': { pb: 1.5 } }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Source Field
                        </Typography>
                        <Typography variant="body1">
                          {mapping.source}
                        </Typography>
                      </Box>
                      <Box sx={{ mx: 2, display: 'flex', alignItems: 'center' }}>
                        <ArrowForwardIcon color="action" />
                        {showConfidence && (
                          <Chip 
                            label={`${mapping.confidence}%`} 
                            size="small" 
                            color={getConfidenceColor(mapping.confidence)}
                            sx={{ ml: 1 }}
                          />
                        )}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Target Field
                        </Typography>
                        <Typography variant="body1">
                          {mapping.target}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 