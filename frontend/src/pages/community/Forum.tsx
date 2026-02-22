import {
  Avatar, Box, Card, Chip, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import PageHeader from '../../components/common/PageHeader';
import { forumPosts } from '../../api/mock/data';
import { formatRelativeTime, formatNumber, getInitials } from '../../utils/format';

const catColors: Record<string, string> = {
  Development: '#6366f1', Database: '#0ea5e9', Design: '#ec4899', DevOps: '#22c55e', General: '#f59e0b',
};

export default function Forum() {
  return (
    <Box>
      <PageHeader title="Forum" subtitle="Join the conversation." breadcrumbs={[{ label: 'Community', href: '/community/forum' }, { label: 'Forum' }]} />
      <Card>
        <TableContainer>
          <Table aria-label="forum posts table">
            <TableHead>
              <TableRow><TableCell>Topic</TableCell><TableCell>Category</TableCell><TableCell align="right">Replies</TableCell><TableCell align="right">Views</TableCell><TableCell>Last Activity</TableCell></TableRow>
            </TableHead>
            <TableBody>
              {forumPosts.map((post) => (
                <TableRow key={post.id} hover sx={{ cursor: 'pointer', '&:last-child td': { border: 0 } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: catColors[post.category] ?? '#6366f1', fontSize: '0.75rem' }}>{getInitials(post.author)}</Avatar>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                          {post.pinned && <PushPinIcon sx={{ fontSize: 14, color: 'primary.main' }} />}
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{post.title}</Typography>
                        </Box>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>by {post.author}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell><Chip label={post.category} size="small" sx={{ bgcolor: `${catColors[post.category] ?? '#6366f1'}15`, color: catColors[post.category] ?? '#6366f1', fontWeight: 600 }} /></TableCell>
                  <TableCell align="right"><Typography variant="body2" sx={{ fontWeight: 600 }}>{post.replies}</Typography></TableCell>
                  <TableCell align="right"><Typography variant="body2" sx={{ color: 'text.secondary' }}>{formatNumber(post.views)}</Typography></TableCell>
                  <TableCell><Typography variant="body2" sx={{ color: 'text.secondary' }}>{formatRelativeTime(post.lastActivity)}</Typography></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
