import {
  Box, Card, CardContent, Chip, Divider, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import PageHeader from '../../components/common/PageHeader';

interface Endpoint {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  path: string;
  description: string;
  auth: boolean;
  params?: string;
}

const methodColors: Record<string, string> = {
  GET: '#22c55e', POST: '#6366f1', PATCH: '#f59e0b', DELETE: '#ef4444',
};

const sections: { title: string; endpoints: Endpoint[] }[] = [
  {
    title: 'Authentication',
    endpoints: [
      { method: 'POST', path: '/auth/register', description: 'Register a new user account', auth: false, params: 'Body: { name, email, password }' },
      { method: 'POST', path: '/auth/login', description: 'Login and receive JWT token', auth: false, params: 'Body: { email, password }' },
      { method: 'GET', path: '/auth/me', description: 'Get current authenticated user profile', auth: true },
    ],
  },
  {
    title: 'Customers',
    endpoints: [
      { method: 'GET', path: '/customers', description: 'List customers with pagination, search, and status filter', auth: true, params: 'Query: page, limit, search, status' },
      { method: 'GET', path: '/customers/:id', description: 'Get a single customer by ID', auth: true },
      { method: 'POST', path: '/customers', description: 'Create a new customer', auth: true, params: 'Body: { name, email, location, status? }' },
      { method: 'PATCH', path: '/customers/:id', description: 'Update customer fields', auth: true },
      { method: 'DELETE', path: '/customers/:id', description: 'Delete a customer', auth: true },
    ],
  },
  {
    title: 'Orders',
    endpoints: [
      { method: 'GET', path: '/orders', description: 'List orders with pagination, search, status, and sorting', auth: true, params: 'Query: page, limit, search, status, sortBy, sortDir' },
      { method: 'POST', path: '/orders', description: 'Create a new order', auth: true, params: 'Body: { customer, total, items, paymentMethod }' },
    ],
  },
  {
    title: 'Invoices',
    endpoints: [
      { method: 'GET', path: '/invoices', description: 'List invoices with pagination and filtering', auth: true, params: 'Query: page, limit, search, status' },
    ],
  },
  {
    title: 'Products',
    endpoints: [
      { method: 'GET', path: '/products', description: 'List all products, optionally filtered by search', auth: true, params: 'Query: search' },
    ],
  },
  {
    title: 'Transactions',
    endpoints: [
      { method: 'GET', path: '/transactions', description: 'List financial transactions with pagination', auth: true, params: 'Query: page, limit, search' },
    ],
  },
  {
    title: 'Tasks',
    endpoints: [
      { method: 'GET', path: '/tasks', description: 'List tasks with pagination', auth: true, params: 'Query: page, limit, status, search' },
      { method: 'GET', path: '/tasks/all', description: 'Get all tasks (for Kanban board)', auth: true },
      { method: 'POST', path: '/tasks', description: 'Create a new task', auth: true, params: 'Body: { title, description?, status?, priority?, dueDate?, tags? }' },
      { method: 'PATCH', path: '/tasks/:id', description: 'Update a task', auth: true },
      { method: 'DELETE', path: '/tasks/:id', description: 'Delete a task', auth: true },
    ],
  },
  {
    title: 'Conversations & Messages',
    endpoints: [
      { method: 'GET', path: '/conversations', description: 'List all conversations', auth: true },
      { method: 'GET', path: '/conversations/:id/messages', description: 'Get messages for a conversation', auth: true },
      { method: 'POST', path: '/conversations/:id/messages', description: 'Send a message in a conversation', auth: true, params: 'Body: { content, senderName? }' },
    ],
  },
  {
    title: 'Community',
    endpoints: [
      { method: 'GET', path: '/community/users', description: 'List community members', auth: true },
      { method: 'GET', path: '/community/feed', description: 'Get feed posts', auth: true },
      { method: 'POST', path: '/community/feed/:id/like', description: 'Like a feed post', auth: true },
      { method: 'GET', path: '/community/forum', description: 'List forum topics', auth: true },
      { method: 'GET', path: '/community/meetups', description: 'List upcoming meetups', auth: true },
    ],
  },
  {
    title: 'Jobs',
    endpoints: [
      { method: 'GET', path: '/jobs', description: 'List job postings', auth: true, params: 'Query: search' },
    ],
  },
  {
    title: 'Calendar',
    endpoints: [
      { method: 'GET', path: '/calendar', description: 'List calendar events', auth: true },
      { method: 'POST', path: '/calendar', description: 'Create a calendar event', auth: true, params: 'Body: { title, start, end, color?, allDay? }' },
    ],
  },
  {
    title: 'Campaigns',
    endpoints: [
      { method: 'GET', path: '/campaigns', description: 'List marketing campaigns', auth: true },
    ],
  },
  {
    title: 'Notifications',
    endpoints: [
      { method: 'GET', path: '/notifications', description: 'List user notifications', auth: true },
      { method: 'GET', path: '/notifications/count', description: 'Get unread notification count', auth: true },
      { method: 'PATCH', path: '/notifications/:id/read', description: 'Mark a notification as read', auth: true },
      { method: 'POST', path: '/notifications/read-all', description: 'Mark all notifications as read', auth: true },
    ],
  },
];

export default function ApiDocs() {
  return (
    <Box>
      <PageHeader title="API Documentation" subtitle="Complete reference for all backend API endpoints." breadcrumbs={[{ label: 'Utility' }, { label: 'API Docs' }]} />

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Getting Started</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 2 }}>
            The API base URL is <code>/api/v1</code>. All protected endpoints require a JWT token in the <code>Authorization: Bearer &lt;token&gt;</code> header.
            Obtain a token by calling <code>POST /api/v1/auth/login</code> with valid credentials.
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Pagination</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}>
            List endpoints accept <code>?page=1&limit=20</code> query parameters. Responses return:
            <code>{' { data: T[], total, page, pageSize, totalPages }'}</code>
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Interactive Docs</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
            Swagger UI is available at <strong>/docs</strong> on the backend server (port 4000) for interactive API exploration and testing.
          </Typography>
        </CardContent>
      </Card>

      {sections.map((section) => (
        <Card key={section.title} sx={{ mb: 3 }}>
          <CardContent sx={{ pb: 0 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{section.title}</Typography>
          </CardContent>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 90 }}>Method</TableCell>
                  <TableCell>Endpoint</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell sx={{ width: 60 }}>Auth</TableCell>
                  <TableCell>Parameters</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {section.endpoints.map((ep) => (
                  <TableRow key={`${ep.method}-${ep.path}`} hover>
                    <TableCell>
                      <Chip label={ep.method} size="small" sx={{ bgcolor: methodColors[ep.method], color: '#fff', fontWeight: 700, fontSize: '0.6875rem' }} />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '0.8125rem' }}>{ep.path}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>{ep.description}</Typography>
                    </TableCell>
                    <TableCell>
                      {ep.auth ? <Chip label="Yes" size="small" color="warning" variant="outlined" sx={{ fontSize: '0.625rem', height: 20 }} /> : <Chip label="No" size="small" variant="outlined" sx={{ fontSize: '0.625rem', height: 20 }} />}
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>{ep.params ?? '—'}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      ))}
    </Box>
  );
}
