import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface Customer {
  id: number;
  name: string;
  initials: string;
  email: string;
  location: string;
  orders: number;
  spent: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

const customers: Customer[] = [
  { id: 1, name: 'Alex Shatov', initials: 'AS', email: 'alex@company.com', location: 'New York, USA', orders: 24, spent: '$3,890', status: 'Active' },
  { id: 2, name: 'Philip Harbach', initials: 'PH', email: 'philip@company.com', location: 'Berlin, DE', orders: 18, spent: '$2,767', status: 'Active' },
  { id: 3, name: 'Mirko Fisuk', initials: 'MF', email: 'mirko@company.com', location: 'Paris, FR', orders: 9, spent: '$1,220', status: 'Inactive' },
  { id: 4, name: 'Olga Semklo', initials: 'OS', email: 'olga@company.com', location: 'London, UK', orders: 32, spent: '$4,580', status: 'Active' },
  { id: 5, name: 'Burak Long', initials: 'BL', email: 'burak@company.com', location: 'Istanbul, TR', orders: 5, spent: '$862', status: 'Pending' },
];

const statusColors: Record<Customer['status'], 'success' | 'error' | 'warning'> = {
  Active: 'success',
  Inactive: 'error',
  Pending: 'warning',
};

const avatarColors = ['#6366f1', '#0ea5e9', '#22c55e', '#f59e0b', '#ef4444'];

export default function CustomersTable() {
  return (
    <Card>
      <CardContent sx={{ px: 0, pb: '16px !important' }}>
        <Box sx={{ px: 3, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
              Customers
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }}>
              Recent customer activity
            </Typography>
          </Box>
          <Chip
            label={`${customers.length} customers`}
            size="small"
            sx={{ bgcolor: 'grey.100', color: 'text.secondary', fontWeight: 500 }}
          />
        </Box>

        <TableContainer>
          <Table aria-label="customers table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Location</TableCell>
                <TableCell align="right">Orders</TableCell>
                <TableCell align="right">Spent</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="right" sx={{ width: 48 }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer, index) => (
                <TableRow
                  key={customer.id}
                  sx={{
                    '&:hover': { bgcolor: 'grey.50' },
                    transition: 'background-color 0.15s',
                    '&:last-child td': { border: 0 },
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: avatarColors[index % avatarColors.length],
                          fontSize: '0.75rem',
                          fontWeight: 700,
                        }}
                      >
                        {customer.initials}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {customer.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {customer.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {customer.location}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {customer.orders}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {customer.spent}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={customer.status}
                      size="small"
                      color={statusColors[customer.status]}
                      variant="outlined"
                      sx={{ fontSize: '0.6875rem', height: 24 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Actions">
                      <IconButton size="small" aria-label={`actions for ${customer.name}`}>
                        <MoreHorizIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
