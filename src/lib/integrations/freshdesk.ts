/**
 * Freshdesk Integration Utilities
 * Custom connector for Freshdesk support tickets and contacts
 * (Uses Freshdesk REST API - requires setup)
 */

import { projectId, publicAnonKey } from '../../utils/supabase/info';

const FRESHDESK_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-07d6ee5a/freshdesk`;

export interface FreshdeskTicket {
  id: number;
  subject: string;
  description: string;
  description_text?: string;
  status: number; // 2=Open, 3=Pending, 4=Resolved, 5=Closed
  priority: number; // 1=Low, 2=Medium, 3=High, 4=Urgent
  type?: string;
  source: number; // 1=Email, 2=Portal, 3=Phone, etc.
  created_at: string;
  updated_at: string;
  due_by?: string;
  fr_due_by?: string; // First response due by
  responder_id?: number;
  requester_id: number;
  tags?: string[];
  custom_fields?: Record<string, any>;
}

export interface FreshdeskContact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  mobile?: string;
  company_id?: number;
  created_at: string;
  updated_at: string;
  tags?: string[];
}

export interface FreshdeskConversation {
  id: number;
  body: string;
  body_text?: string;
  from_email?: string;
  to_emails?: string[];
  incoming: boolean;
  user_id?: number;
  created_at: string;
  updated_at: string;
}

export interface SearchOptions {
  query?: string;
  status?: number[];
  priority?: number[];
  type?: string;
  requester_id?: number;
  agent_id?: number;
  updated_since?: string;
  order_by?: string;
  order_type?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
}

/**
 * Freshdesk Connector Class
 * Provides methods to interact with Freshdesk Support API
 */
export class FreshdeskConnector {
  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${FRESHDESK_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Freshdesk API error: ${error}`);
    }

    return response.json();
  }

  /**
   * List all tickets with optional filters
   */
  async listTickets(options: SearchOptions = {}): Promise<FreshdeskTicket[]> {
    const params = new URLSearchParams();
    
    if (options.updated_since) params.append('updated_since', options.updated_since);
    if (options.requester_id) params.append('requester_id', String(options.requester_id));
    if (options.order_by) params.append('order_by', options.order_by);
    if (options.order_type) params.append('order_type', options.order_type);
    if (options.page) params.append('page', String(options.page));
    if (options.per_page) params.append('per_page', String(options.per_page));

    return this.makeRequest(`/tickets?${params.toString()}`);
  }

  /**
   * Search tickets using Freshdesk query
   */
  async searchTickets(query: string): Promise<FreshdeskTicket[]> {
    return this.makeRequest('/search/tickets', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
  }

  /**
   * Get a specific ticket by ID
   */
  async getTicket(id: number): Promise<FreshdeskTicket> {
    return this.makeRequest(`/tickets/${id}`);
  }

  /**
   * Get conversations for a ticket
   */
  async getTicketConversations(ticketId: number): Promise<FreshdeskConversation[]> {
    return this.makeRequest(`/tickets/${ticketId}/conversations`);
  }

  /**
   * Create a new ticket
   */
  async createTicket(ticket: Partial<FreshdeskTicket>): Promise<FreshdeskTicket> {
    return this.makeRequest('/tickets', {
      method: 'POST',
      body: JSON.stringify(ticket),
    });
  }

  /**
   * Update an existing ticket
   */
  async updateTicket(id: number, updates: Partial<FreshdeskTicket>): Promise<FreshdeskTicket> {
    return this.makeRequest(`/tickets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  /**
   * Get a contact by ID
   */
  async getContact(id: number): Promise<FreshdeskContact> {
    return this.makeRequest(`/contacts/${id}`);
  }

  /**
   * Search contacts
   */
  async searchContacts(query: string): Promise<FreshdeskContact[]> {
    return this.makeRequest(`/search/contacts?query=${encodeURIComponent(query)}`);
  }

  /**
   * Get ticket statistics
   */
  async getTicketStats(): Promise<{
    open: number;
    pending: number;
    resolved: number;
    closed: number;
  }> {
    return this.makeRequest('/tickets/stats');
  }

  /**
   * Get SLA metrics for a ticket
   */
  async getTicketSLA(ticketId: number): Promise<{
    first_response_time: number;
    resolution_time: number;
    first_response_due_by: string;
    resolution_due_by: string;
  }> {
    return this.makeRequest(`/tickets/${ticketId}/sla`);
  }

  /**
   * Search knowledge base articles
   */
  async searchKnowledgeBase(query: string): Promise<any[]> {
    return this.makeRequest(`/solutions/articles/search?term=${encodeURIComponent(query)}`);
  }
}

// Export singleton instance
export const freshdeskConnector = new FreshdeskConnector();

// Status mapping utilities
export const FRESHDESK_STATUS = {
  OPEN: 2,
  PENDING: 3,
  RESOLVED: 4,
  CLOSED: 5,
} as const;

export const FRESHDESK_PRIORITY = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  URGENT: 4,
} as const;

export function getStatusLabel(status: number): string {
  const labels: Record<number, string> = {
    2: 'Open',
    3: 'Pending',
    4: 'Resolved',
    5: 'Closed',
  };
  return labels[status] || 'Unknown';
}

export function getPriorityLabel(priority: number): string {
  const labels: Record<number, string> = {
    1: 'Low',
    2: 'Medium',
    3: 'High',
    4: 'Urgent',
  };
  return labels[priority] || 'Unknown';
}

export function getStatusColor(status: number): string {
  const colors: Record<number, string> = {
    2: '#529ADB', // Open - Blue
    3: '#E27305', // Pending - Orange
    4: '#46A57B', // Resolved - Green
    5: '#33475B', // Closed - Dark Blue
  };
  return colors[status] || '#CBD5E0';
}

export function getPriorityColor(priority: number): string {
  const colors: Record<number, string> = {
    1: '#46A57B', // Low - Green
    2: '#529ADB', // Medium - Blue
    3: '#E27305', // High - Orange
    4: '#F87171', // Urgent - Red
  };
  return colors[priority] || '#CBD5E0';
}
