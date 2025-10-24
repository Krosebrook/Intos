/**
 * HubSpot Integration Utilities
 * Provides type-safe access to HubSpot CRM data (contacts, companies, deals, tickets)
 */

import { projectId, publicAnonKey } from '../../utils/supabase/info';

const HUBSPOT_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-07d6ee5a/hubspot`;

export interface HubSpotContact {
  id: string;
  properties: {
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    company?: string;
    createdate?: string;
    lastmodifieddate?: string;
    lifecyclestage?: string;
    hs_lead_status?: string;
  };
}

export interface HubSpotCompany {
  id: string;
  properties: {
    name?: string;
    domain?: string;
    industry?: string;
    phone?: string;
    city?: string;
    state?: string;
    country?: string;
    createdate?: string;
    numberofemployees?: string;
    annualrevenue?: string;
  };
}

export interface HubSpotDeal {
  id: string;
  properties: {
    dealname?: string;
    amount?: string;
    dealstage?: string;
    pipeline?: string;
    closedate?: string;
    createdate?: string;
    hs_priority?: string;
    hubspot_owner_id?: string;
  };
  associations?: {
    contacts?: string[];
    companies?: string[];
  };
}

export interface HubSpotTicket {
  id: string;
  properties: {
    subject?: string;
    content?: string;
    hs_pipeline_stage?: string;
    hs_ticket_priority?: string;
    createdate?: string;
    hs_lastmodifieddate?: string;
    hubspot_owner_id?: string;
  };
}

export interface SearchOptions {
  query?: string;
  filters?: Record<string, any>;
  limit?: number;
  sort?: string;
  sortDirection?: 'asc' | 'desc';
}

/**
 * HubSpot Connector Class
 * Provides methods to interact with HubSpot CRM API
 */
export class HubSpotConnector {
  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${HUBSPOT_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HubSpot API error: ${error}`);
    }

    return response.json();
  }

  /**
   * Search for contacts using HubSpot query DSL
   * Example: searchContacts({ query: "Jane Doe", limit: 10 })
   */
  async searchContacts(options: SearchOptions = {}): Promise<HubSpotContact[]> {
    const { query = '', limit = 20, sort = 'createdate', sortDirection = 'desc' } = options;
    
    // Build HubSpot query DSL
    const queryDSL = `_query_version_2_ op:find_objects object_type:contacts ${
      query ? `q:"${query}"` : ''
    } limit:${limit} sort:${sort}:${sortDirection}`;

    return this.makeRequest('/search', {
      method: 'POST',
      body: JSON.stringify({ query: queryDSL }),
    });
  }

  /**
   * Search for companies
   */
  async searchCompanies(options: SearchOptions = {}): Promise<HubSpotCompany[]> {
    const { query = '', limit = 20, sort = 'createdate', sortDirection = 'desc' } = options;
    
    const queryDSL = `_query_version_2_ op:find_objects object_type:companies ${
      query ? `q:"${query}"` : ''
    } limit:${limit} sort:${sort}:${sortDirection}`;

    return this.makeRequest('/search', {
      method: 'POST',
      body: JSON.stringify({ query: queryDSL }),
    });
  }

  /**
   * Search for deals
   */
  async searchDeals(options: SearchOptions = {}): Promise<HubSpotDeal[]> {
    const { query = '', limit = 20, sort = 'createdate', sortDirection = 'desc' } = options;
    
    const queryDSL = `_query_version_2_ op:find_objects object_type:deals ${
      query ? `q:"${query}"` : ''
    } limit:${limit} sort:${sort}:${sortDirection}`;

    return this.makeRequest('/search', {
      method: 'POST',
      body: JSON.stringify({ query: queryDSL }),
    });
  }

  /**
   * Search for tickets
   */
  async searchTickets(options: SearchOptions = {}): Promise<HubSpotTicket[]> {
    const { query = '', limit = 20, sort = 'createdate', sortDirection = 'desc' } = options;
    
    const queryDSL = `_query_version_2_ op:find_objects object_type:tickets ${
      query ? `q:"${query}"` : ''
    } limit:${limit} sort:${sort}:${sortDirection}`;

    return this.makeRequest('/search', {
      method: 'POST',
      body: JSON.stringify({ query: queryDSL }),
    });
  }

  /**
   * Fetch a specific contact by ID
   */
  async fetchContact(id: string): Promise<HubSpotContact> {
    return this.makeRequest(`/contacts/${id}`);
  }

  /**
   * Fetch a specific company by ID
   */
  async fetchCompany(id: string): Promise<HubSpotCompany> {
    return this.makeRequest(`/companies/${id}`);
  }

  /**
   * Fetch a specific deal by ID
   */
  async fetchDeal(id: string): Promise<HubSpotDeal> {
    return this.makeRequest(`/deals/${id}`);
  }

  /**
   * Fetch a specific ticket by ID
   */
  async fetchTicket(id: string): Promise<HubSpotTicket> {
    return this.makeRequest(`/tickets/${id}`);
  }

  /**
   * Get deals closing soon (within 30 days)
   */
  async getDealsClosingSoon(): Promise<HubSpotDeal[]> {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    
    const queryDSL = `_query_version_2_ op:find_objects object_type:deals closedate:lt:${thirtyDaysFromNow.getTime()} dealstage:neq:closedwon dealstage:neq:closedlost limit:50 sort:closedate:asc`;

    return this.makeRequest('/search', {
      method: 'POST',
      body: JSON.stringify({ query: queryDSL }),
    });
  }

  /**
   * Get open deals for a specific company
   */
  async getOpenDealsForCompany(companyId: string): Promise<HubSpotDeal[]> {
    const queryDSL = `_query_version_2_ op:find_objects object_type:deals associatedcompanyid:eq:${companyId} dealstage:neq:closedwon dealstage:neq:closedlost limit:50`;

    return this.makeRequest('/search', {
      method: 'POST',
      body: JSON.stringify({ query: queryDSL }),
    });
  }

  /**
   * Count objects (used for statistics)
   */
  async countContacts(): Promise<number> {
    const queryDSL = `_query_version_2_ op:count_objects object_type:contacts`;
    const result = await this.makeRequest('/search', {
      method: 'POST',
      body: JSON.stringify({ query: queryDSL }),
    });
    return result.count || 0;
  }

  async countDeals(): Promise<number> {
    const queryDSL = `_query_version_2_ op:count_objects object_type:deals`;
    const result = await this.makeRequest('/search', {
      method: 'POST',
      body: JSON.stringify({ query: queryDSL }),
    });
    return result.count || 0;
  }

  async countCompanies(): Promise<number> {
    const queryDSL = `_query_version_2_ op:count_objects object_type:companies`;
    const result = await this.makeRequest('/search', {
      method: 'POST',
      body: JSON.stringify({ query: queryDSL }),
    });
    return result.count || 0;
  }
}

// Export singleton instance
export const hubspotConnector = new HubSpotConnector();
