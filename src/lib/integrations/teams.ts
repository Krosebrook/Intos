/**
 * Microsoft Teams Integration Utilities
 * Custom connector for Teams channels, messages, and meetings
 * (Uses Microsoft Graph API - requires OAuth setup)
 */

import { projectId, publicAnonKey } from '../../utils/supabase/info';

const TEAMS_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-07d6ee5a/teams`;

export interface TeamsChannel {
  id: string;
  displayName: string;
  description?: string;
  email?: string;
  webUrl?: string;
  membershipType: 'standard' | 'private';
  createdDateTime: string;
}

export interface TeamsMessage {
  id: string;
  createdDateTime: string;
  lastModifiedDateTime?: string;
  deletedDateTime?: string;
  subject?: string;
  body: {
    content: string;
    contentType: 'text' | 'html';
  };
  from: {
    user?: {
      id: string;
      displayName: string;
      userIdentityType: string;
    };
  };
  attachments?: any[];
  mentions?: any[];
  importance: 'normal' | 'high' | 'urgent';
}

export interface TeamsMeeting {
  id: string;
  subject: string;
  body: {
    content: string;
    contentType: 'text' | 'html';
  };
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  location?: {
    displayName: string;
  };
  attendees: Array<{
    emailAddress: {
      address: string;
      name: string;
    };
    type: 'required' | 'optional' | 'resource';
  }>;
  onlineMeeting?: {
    joinUrl: string;
  };
  organizer: {
    emailAddress: {
      address: string;
      name: string;
    };
  };
}

export interface AdaptiveCard {
  type: 'AdaptiveCard';
  version: '1.4';
  body: Array<{
    type: string;
    [key: string]: any;
  }>;
  actions?: Array<{
    type: string;
    title: string;
    url?: string;
    data?: any;
  }>;
}

/**
 * Microsoft Teams Connector Class
 * Provides methods to interact with Microsoft Teams via Graph API
 */
export class TeamsConnector {
  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${TEAMS_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Teams API error: ${error}`);
    }

    return response.json();
  }

  /**
   * List all teams the user is a member of
   */
  async listTeams(): Promise<any[]> {
    return this.makeRequest('/teams');
  }

  /**
   * List channels in a team
   */
  async listChannels(teamId: string): Promise<TeamsChannel[]> {
    return this.makeRequest(`/teams/${teamId}/channels`);
  }

  /**
   * Get messages from a channel
   */
  async getChannelMessages(teamId: string, channelId: string, limit: number = 50): Promise<TeamsMessage[]> {
    return this.makeRequest(`/teams/${teamId}/channels/${channelId}/messages?$top=${limit}`);
  }

  /**
   * Send a message to a channel
   */
  async sendChannelMessage(
    teamId: string,
    channelId: string,
    content: string,
    contentType: 'text' | 'html' = 'html'
  ): Promise<TeamsMessage> {
    return this.makeRequest(`/teams/${teamId}/channels/${channelId}/messages`, {
      method: 'POST',
      body: JSON.stringify({
        body: {
          content,
          contentType,
        },
      }),
    });
  }

  /**
   * Send an adaptive card to a channel
   */
  async sendAdaptiveCard(
    teamId: string,
    channelId: string,
    card: AdaptiveCard
  ): Promise<TeamsMessage> {
    return this.makeRequest(`/teams/${teamId}/channels/${channelId}/messages`, {
      method: 'POST',
      body: JSON.stringify({
        body: {
          contentType: 'html',
          content: `<attachment id="adaptive-card"></attachment>`,
        },
        attachments: [
          {
            id: 'adaptive-card',
            contentType: 'application/vnd.microsoft.card.adaptive',
            content: JSON.stringify(card),
          },
        ],
      }),
    });
  }

  /**
   * Create a Teams meeting
   */
  async createMeeting(meeting: Partial<TeamsMeeting>): Promise<TeamsMeeting> {
    return this.makeRequest('/calendar/events', {
      method: 'POST',
      body: JSON.stringify({
        ...meeting,
        isOnlineMeeting: true,
        onlineMeetingProvider: 'teamsForBusiness',
      }),
    });
  }

  /**
   * Reply to a message
   */
  async replyToMessage(
    teamId: string,
    channelId: string,
    messageId: string,
    content: string
  ): Promise<TeamsMessage> {
    return this.makeRequest(`/teams/${teamId}/channels/${channelId}/messages/${messageId}/replies`, {
      method: 'POST',
      body: JSON.stringify({
        body: {
          content,
          contentType: 'html',
        },
      }),
    });
  }

  /**
   * Get user presence status
   */
  async getUserPresence(userId: string): Promise<{
    availability: 'Available' | 'Away' | 'Busy' | 'DoNotDisturb' | 'Offline';
    activity: string;
  }> {
    return this.makeRequest(`/users/${userId}/presence`);
  }

  /**
   * Search messages across teams
   */
  async searchMessages(query: string): Promise<TeamsMessage[]> {
    return this.makeRequest(`/search/messages?query=${encodeURIComponent(query)}`);
  }
}

// Export singleton instance
export const teamsConnector = new TeamsConnector();

/**
 * Create an adaptive card for ticket notifications
 */
export function createTicketNotificationCard(ticket: {
  id: string;
  subject: string;
  priority: string;
  status: string;
  description: string;
  url: string;
}): AdaptiveCard {
  return {
    type: 'AdaptiveCard',
    version: '1.4',
    body: [
      {
        type: 'TextBlock',
        text: '🎫 New High-Priority Ticket',
        weight: 'Bolder',
        size: 'Large',
        color: 'Attention',
      },
      {
        type: 'TextBlock',
        text: ticket.subject,
        weight: 'Bolder',
        size: 'Medium',
        wrap: true,
      },
      {
        type: 'FactSet',
        facts: [
          { title: 'Ticket ID:', value: ticket.id },
          { title: 'Priority:', value: ticket.priority },
          { title: 'Status:', value: ticket.status },
        ],
      },
      {
        type: 'TextBlock',
        text: ticket.description,
        wrap: true,
        maxLines: 3,
      },
    ],
    actions: [
      {
        type: 'Action.OpenUrl',
        title: 'View Ticket',
        url: ticket.url,
      },
      {
        type: 'Action.Submit',
        title: 'Assign to Me',
        data: { action: 'assign', ticketId: ticket.id },
      },
    ],
  };
}

/**
 * Create an adaptive card for workflow escalations
 */
export function createEscalationCard(escalation: {
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  priority: string;
  url: string;
}): AdaptiveCard {
  return {
    type: 'AdaptiveCard',
    version: '1.4',
    body: [
      {
        type: 'TextBlock',
        text: '⚠️ Workflow Escalation',
        weight: 'Bolder',
        size: 'Large',
        color: 'Warning',
      },
      {
        type: 'TextBlock',
        text: escalation.title,
        weight: 'Bolder',
        size: 'Medium',
        wrap: true,
      },
      {
        type: 'ColumnSet',
        columns: [
          {
            type: 'Column',
            width: 'stretch',
            items: [
              {
                type: 'FactSet',
                facts: [
                  { title: 'Assigned To:', value: escalation.assignedTo },
                  { title: 'Due Date:', value: escalation.dueDate },
                  { title: 'Priority:', value: escalation.priority },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'TextBlock',
        text: escalation.description,
        wrap: true,
      },
    ],
    actions: [
      {
        type: 'Action.OpenUrl',
        title: 'View Details',
        url: escalation.url,
      },
      {
        type: 'Action.Submit',
        title: 'Acknowledge',
        data: { action: 'acknowledge' },
      },
    ],
  };
}

/**
 * Create a meeting agenda card
 */
export function createMeetingAgendaCard(meeting: {
  title: string;
  startTime: string;
  endTime: string;
  attendees: string[];
  agenda: string[];
  joinUrl: string;
}): AdaptiveCard {
  return {
    type: 'AdaptiveCard',
    version: '1.4',
    body: [
      {
        type: 'TextBlock',
        text: '📅 Meeting Agenda',
        weight: 'Bolder',
        size: 'Large',
      },
      {
        type: 'TextBlock',
        text: meeting.title,
        weight: 'Bolder',
        size: 'Medium',
        wrap: true,
      },
      {
        type: 'FactSet',
        facts: [
          { title: 'Start:', value: meeting.startTime },
          { title: 'End:', value: meeting.endTime },
          { title: 'Attendees:', value: meeting.attendees.join(', ') },
        ],
      },
      {
        type: 'TextBlock',
        text: 'Agenda:',
        weight: 'Bolder',
      },
      ...meeting.agenda.map((item, index) => ({
        type: 'TextBlock',
        text: `${index + 1}. ${item}`,
        wrap: true,
      })),
    ],
    actions: [
      {
        type: 'Action.OpenUrl',
        title: 'Join Meeting',
        url: meeting.joinUrl,
      },
    ],
  };
}
