import { Avatar, Box, Button, Card, CardContent, Divider, IconButton, TextField, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import PageHeader from '../../components/common/PageHeader';
import LoadingState from '../../components/common/LoadingState';
import { useFetch } from '../../hooks/useFetch';
import { api, fetchAll } from '../../api/client';
import { formatRelativeTime, getInitials } from '../../utils/format';
import type { FeedPost } from '../../types';
import { useState } from 'react';

const colors = ['#6366f1', '#0ea5e9', '#22c55e'];

export default function Feed() {
  const { data: fetchedPosts, loading } = useFetch(() => fetchAll<FeedPost>('/community/feed'), []);
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => {
    setLiked((p) => ({ ...p, [id]: !p[id] }));
    void api.post(`/community/feed/${id}/like`);
  };

  if (loading) return <LoadingState fullPage />;
  const posts = fetchedPosts ?? [];

  return (
    <Box>
      <PageHeader title="Feed" subtitle="Stay connected with your community." breadcrumbs={[{ label: 'Community', href: '/community/feed' }, { label: 'Feed' }]} />
      <Card sx={{ mb: 3 }}><CardContent><Box sx={{ display: 'flex', gap: 2 }}><Avatar sx={{ bgcolor: '#6366f1' }}>A</Avatar><Box sx={{ flex: 1 }}><TextField fullWidth multiline rows={2} placeholder="What's on your mind?" variant="outlined" /><Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.5 }}><Button variant="contained" size="small">Post</Button></Box></Box></Box></CardContent></Card>
      {posts.map((post, idx) => (
        <Card key={post.id} sx={{ mb: 3 }}><CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}><Avatar sx={{ bgcolor: colors[idx % colors.length] }}>{getInitials(post.author)}</Avatar><Box><Typography variant="body2" sx={{ fontWeight: 600 }}>{post.author}</Typography><Typography variant="caption" sx={{ color: 'text.secondary' }}>{formatRelativeTime(post.createdAt ?? post.time ?? '')}</Typography></Box></Box>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>{post.content}</Typography>
          <Divider sx={{ mb: 1.5 }} />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton size="small" onClick={() => toggleLike(post.id)} sx={{ color: liked[post.id] ? 'error.main' : 'text.secondary' }}>{liked[post.id] ? <FavoriteIcon sx={{ fontSize: 18 }} /> : <FavoriteBorderIcon sx={{ fontSize: 18 }} />}</IconButton>
            <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>{post.likes + (liked[post.id] ? 1 : 0)}</Typography>
            <IconButton size="small" sx={{ color: 'text.secondary' }}><ChatBubbleOutlineIcon sx={{ fontSize: 18 }} /></IconButton>
            <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>{post.comments}</Typography>
            <IconButton size="small" sx={{ color: 'text.secondary' }}><ShareOutlinedIcon sx={{ fontSize: 18 }} /></IconButton>
            <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>{post.shares}</Typography>
          </Box>
        </CardContent></Card>
      ))}
    </Box>
  );
}
