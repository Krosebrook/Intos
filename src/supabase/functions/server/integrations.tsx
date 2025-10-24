/**
 * Integration API Endpoints
 * Handles HubSpot, Freshdesk, and Microsoft Teams integrations
 */

import { Hono } from 'npm:hono@4';
import { cors } from 'npm:hono/cors';

const app = new Hono();

// Enable CORS
app.use('*', cors());

// ==========================================
// HubSpot Integration Endpoints
// ==========================================

/**
 * Search HubSpot objects using Query DSL
 * POST /hubspot/search
 * Body: { query: string }
 */
app.post('/hubspot/search', async (c) => {
  try {
    const { query } = await c.req.json();
    
    // In production, this would call the HubSpot API
    // For now, return mock data based on the query type
    
    if (query.includes('object_type:contacts')) {
      return c.json({
        results: [
          {
            id: 'contact-1',
            properties: {
              firstname: 'Sarah',
              lastname: 'Chen',
              email: 'sarah.chen@acmecorp.com',
              company: 'Acme Corporation',
              phone: '+1-555-0123',
              lifecyclestage: 'customer',
              createdate: '2024-01-15T10:00:00Z'
            }
          },
          {
            id: 'contact-2',
            properties: {
              firstname: 'Michael',
              lastname: 'Torres',
              email: 'michael.t@techstartup.io',
              company: 'TechStart Inc',
              phone: '+1-555-0456',
              lifecyclestage: 'lead',
              createdate: '2024-03-20T14:30:00Z'
            }
          }
        ]
      });
    }

    if (query.includes('object_type:companies')) {
      return c.json({
        results: [
          {
            id: 'company-1',
            properties: {
              name: 'Acme Corporation',
              domain: 'acmecorp.com',
              industry: 'Technology',
              city: 'San Francisco',
              state: 'CA',
              country: 'USA',
              numberofemployees: '500',
              annualrevenue: '50000000'
            }
          }
        ]
      });
    }

    if (query.includes('object_type:deals')) {
      return c.json({
        results: [
          {
            id: 'deal-1',
            properties: {
              dealname: 'Acme Corp - Enterprise License',
              amount: '45000',
              dealstage: 'proposal-sent',
              closedate: '2025-11-15',
              pipeline: 'default',
              hs_priority: 'high',
              createdate: '2024-10-01T09:00:00Z'
            }
          },
          {
            id: 'deal-2',
            properties: {
              dealname: 'TechStart - Professional Plan',
              amount: '12500',
              dealstage: 'negotiation',
              closedate: '2025-11-30',
              pipeline: 'default',
              hs_priority: 'medium',
              createdate: '2024-10-10T11:00:00Z'
            }
          }
        ]
      });
    }

    if (query.includes('object_type:tickets')) {
      return c.json({
        results: [
          {
            id: 'ticket-1',
            properties: {
              subject: 'API Integration Question',
              content: 'Customer asking about rate limits',
              hs_pipeline_stage: 'open',
              hs_ticket_priority: 'MEDIUM',
              createdate: '2024-10-24T08:00:00Z'
            }
          }
        ]
      });
    }

    return c.json({ results: [] });

  } catch (error: any) {
    console.error('HubSpot search error:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * Fetch a specific HubSpot contact
 * GET /hubspot/contacts/:id
 */
app.get('/hubspot/contacts/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    // Mock data - in production, fetch from HubSpot API
    return c.json({
      id,
      properties: {
        firstname: 'Sarah',
        lastname: 'Chen',
        email: 'sarah.chen@acmecorp.com',
        company: 'Acme Corporation',
        phone: '+1-555-0123',
        lifecyclestage: 'customer',
        createdate: '2024-01-15T10:00:00Z',
        lastmodifieddate: '2024-10-20T15:30:00Z'
      }
    });

  } catch (error: any) {
    console.error('HubSpot fetch contact error:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * Fetch a specific HubSpot company
 * GET /hubspot/companies/:id
 */
app.get('/hubspot/companies/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    return c.json({
      id,
      properties: {
        name: 'Acme Corporation',
        domain: 'acmecorp.com',
        industry: 'Technology',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        numberofemployees: '500',
        annualrevenue: '50000000',
        createdate: '2024-01-10T09:00:00Z'
      }
    });

  } catch (error: any) {
    console.error('HubSpot fetch company error:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * Fetch a specific HubSpot deal
 * GET /hubspot/deals/:id
 */
app.get('/hubspot/deals/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    return c.json({
      id,
      properties: {
        dealname: 'Acme Corp - Enterprise License',
        amount: '45000',
        dealstage: 'proposal-sent',
        closedate: '2025-11-15',
        pipeline: 'default',
        hs_priority: 'high',
        createdate: '2024-10-01T09:00:00Z'
      },
      associations: {
        contacts: ['contact-1'],
        companies: ['company-1']
      }
    });

  } catch (error: any) {
    console.error('HubSpot fetch deal error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ==========================================
// Freshdesk Integration Endpoints
// ==========================================

/**
 * List Freshdesk tickets
 * GET /freshdesk/tickets
 */
app.get('/freshdesk/tickets', async (c) => {
  try {
    // In production, call Freshdesk API with proper authentication
    // For now, return mock data
    
    return c.json([
      {
        id: 1234,
        subject: 'API Integration Issue - Production',
        description: 'Customer experiencing timeout errors',
        description_text: 'Customer experiencing timeout errors',
        status: 2, // Open
        priority: 4, // Urgent
        source: 1, // Email
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        requester_id: 5001,
        tags: ['api', 'production', 'urgent']
      },
      {
        id: 5678,
        subject: 'Feature Request: Dark Mode',
        description: 'Request for dark mode in mobile app',
        description_text: 'Request for dark mode in mobile app',
        status: 3, // Pending
        priority: 2, // Medium
        source: 2, // Portal
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        requester_id: 5002,
        tags: ['feature-request', 'ui']
      }
    ]);

  } catch (error: any) {
    console.error('Freshdesk list tickets error:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * Get a specific Freshdesk ticket
 * GET /freshdesk/tickets/:id
 */
app.get('/freshdesk/tickets/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    
    return c.json({
      id,
      subject: 'API Integration Issue - Production',
      description: '<p>Customer experiencing timeout errors when calling the API</p>',
      description_text: 'Customer experiencing timeout errors when calling the API',
      status: 2, // Open
      priority: 4, // Urgent
      type: 'Technical Issue',
      source: 1, // Email
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      requester_id: 5001,
      responder_id: 1001,
      tags: ['api', 'production', 'urgent'],
      custom_fields: {
        cf_severity: 'High',
        cf_environment: 'Production'
      }
    });

  } catch (error: any) {
    console.error('Freshdesk get ticket error:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * Get conversations for a ticket
 * GET /freshdesk/tickets/:id/conversations
 */
app.get('/freshdesk/tickets/:id/conversations', async (c) => {
  try {
    const ticketId = parseInt(c.req.param('id'));
    
    return c.json([
      {
        id: 10001,
        body: '<p>Initial inquiry about API timeout issues</p>',
        body_text: 'Initial inquiry about API timeout issues',
        from_email: 'customer@example.com',
        incoming: true,
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 10002,
        body: '<p>Thank you for reaching out. We are investigating the issue.</p>',
        body_text: 'Thank you for reaching out. We are investigating the issue.',
        from_email: 'support@intinc.com',
        to_emails: ['customer@example.com'],
        incoming: false,
        user_id: 1001,
        created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
      }
    ]);

  } catch (error: any) {
    console.error('Freshdesk get conversations error:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * Search Freshdesk tickets
 * POST /freshdesk/search/tickets
 */
app.post('/freshdesk/search/tickets', async (c) => {
  try {
    const { query } = await c.req.json();
    
    // Mock search results
    return c.json([
      {
        id: 1234,
        subject: 'API Integration Issue - Production',
        status: 2,
        priority: 4,
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      }
    ]);

  } catch (error: any) {
    console.error('Freshdesk search error:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * Update a Freshdesk ticket
 * PUT /freshdesk/tickets/:id
 */
app.put('/freshdesk/tickets/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const updates = await c.req.json();
    
    console.log(`Updating Freshdesk ticket ${id}:`, updates);
    
    // In production, call Freshdesk API
    return c.json({
      id,
      ...updates,
      updated_at: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Freshdesk update ticket error:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * Get ticket statistics
 * GET /freshdesk/tickets/stats
 */
app.get('/freshdesk/tickets/stats', async (c) => {
  try {
    return c.json({
      open: 145,
      pending: 89,
      resolved: 234,
      closed: 1567
    });

  } catch (error: any) {
    console.error('Freshdesk stats error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ==========================================
// Microsoft Teams Integration Endpoints
// ==========================================

/**
 * List Teams
 * GET /teams/teams
 */
app.get('/teams/teams', async (c) => {
  try {
    // In production, call Microsoft Graph API
    return c.json([
      {
        id: 'team-1',
        displayName: 'Engineering',
        description: 'Engineering team workspace',
        createdDateTime: '2024-01-01T00:00:00Z'
      },
      {
        id: 'team-2',
        displayName: 'Customer Success',
        description: 'Customer success and support',
        createdDateTime: '2024-01-01T00:00:00Z'
      }
    ]);

  } catch (error: any) {
    console.error('Teams list error:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * List channels in a team
 * GET /teams/teams/:teamId/channels
 */
app.get('/teams/teams/:teamId/channels', async (c) => {
  try {
    const teamId = c.req.param('teamId');
    
    return c.json([
      {
        id: 'channel-1',
        displayName: 'General',
        description: 'General channel',
        membershipType: 'standard',
        createdDateTime: '2024-01-01T00:00:00Z'
      },
      {
        id: 'channel-2',
        displayName: 'Incidents',
        description: 'Incident notifications',
        membershipType: 'standard',
        createdDateTime: '2024-01-15T00:00:00Z'
      }
    ]);

  } catch (error: any) {
    console.error('Teams list channels error:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * Send a message to a channel
 * POST /teams/teams/:teamId/channels/:channelId/messages
 */
app.post('/teams/teams/:teamId/channels/:channelId/messages', async (c) => {
  try {
    const teamId = c.req.param('teamId');
    const channelId = c.req.param('channelId');
    const message = await c.req.json();
    
    console.log(`Sending Teams message to ${teamId}/${channelId}:`, message);
    
    // In production, call Microsoft Graph API
    return c.json({
      id: 'message-' + Date.now(),
      createdDateTime: new Date().toISOString(),
      body: message.body,
      from: {
        user: {
          id: 'bot-1',
          displayName: 'INT OS Bot',
          userIdentityType: 'application'
        }
      }
    });

  } catch (error: any) {
    console.error('Teams send message error:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * Create a Teams meeting
 * POST /teams/calendar/events
 */
app.post('/teams/calendar/events', async (c) => {
  try {
    const meeting = await c.req.json();
    
    console.log('Creating Teams meeting:', meeting);
    
    // In production, call Microsoft Graph API
    return c.json({
      id: 'meeting-' + Date.now(),
      ...meeting,
      onlineMeeting: {
        joinUrl: 'https://teams.microsoft.com/l/meetup-join/...'
      },
      createdDateTime: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Teams create meeting error:', error);
    return c.json({ error: error.message }, 500);
  }
});

export default app;
