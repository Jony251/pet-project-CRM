import { useState } from 'react';
import {
  Avatar, Box, Button, Card, Tab, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Tabs, Typography,
} from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import PageHeader from '../../components/common/PageHeader';
import { communityUsers } from '../../api/mock/data';
import { formatNumber, getInitials } from '../../utils/format';

export default function UsersTabs() {
  const [tab, setTab] = useState(0);
  const filtered = tab === 0 ? communityUsers : tab === 1 ? communityUsers.filter((_, i) => i < 3) : communityUsers.filter((_, i) => i >= 3);

  return (
    <Box>
      <PageHeader title="Users" subtitle="Browse and manage community members." breadcrumbs={[{ label: 'Community', href: '/community/users-tabs' }, { label: 'Users – Tabs' }]} />
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="user tabs">
            <Tab label={`All (${communityUsers.length})`} />
            <Tab label="Creators (3)" />
            <Tab label="Subscribers (3)" />
          </Tabs>
        </Box>
        <TableContainer>
          <Table aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell><TableCell>Handle</TableCell><TableCell>Location</TableCell>
                <TableCell align="right">Posts</TableCell><TableCell align="right">Followers</TableCell><TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((user) => (
                <TableRow key={user.id} hover sx={{ '&:last-child td': { border: 0 } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 36, height: 36, bgcolor: user.bgColor, fontSize: '0.75rem' }}>{getInitials(user.name)}</Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{user.name}</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>{user.bio.slice(0, 40)}…</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell><Typography variant="body2" sx={{ color: 'primary.main' }}>{user.handle}</Typography></TableCell>
                  <TableCell><Typography variant="body2" sx={{ color: 'text.secondary' }}>{user.location}</Typography></TableCell>
                  <TableCell align="right"><Typography variant="body2" sx={{ fontWeight: 600 }}>{user.posts}</Typography></TableCell>
                  <TableCell align="right"><Typography variant="body2" sx={{ fontWeight: 600 }}>{formatNumber(user.followers)}</Typography></TableCell>
                  <TableCell align="right">
                    <Button variant="outlined" size="small" startIcon={<PersonAddOutlinedIcon sx={{ fontSize: 14 }} />} sx={{ fontSize: '0.75rem' }}>Follow</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
