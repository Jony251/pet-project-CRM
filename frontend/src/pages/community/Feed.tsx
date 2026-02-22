import { useState } from 'react';
import {
  Avatar, Box, Button, Card, CardContent, Divider, IconButton, TextField, Typography,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import PageHeader from '../../components/common/PageHeader';
import { feedPosts } from '../../api/mock/data';
import { formatRelativeTime, getInitials } from '../../utils/format';

const colors = ['#6366f1', '#0ea5e9', '#22c55e'];

export default function Feed() {
  const [posts, setPosts] = useState(feedPosts);

  const toggleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p,
      ),
    );
  };

  return (
    <Box>
      <PageHeader title="Feed" subtitle="Stay connected with your community." breadcrumbs={[{ label: 'Community', href: '/community/feed' }, { label: 'Feed' }]} />

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Avatar sx={{ bgcolor: '#6366f1' }}>A</Avatar>
            <Box sx={{ flex: 1 }}>
              <TextField fullWidth multiline rows={2} placeholder="What's on your mind?" variant="outlined" />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.5 }}>
                <Button variant="contained" size="small">Post</Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {posts.map((post, idx) => (
        <Card key={post.id} sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Avatar sx={{ bgcolor: colors[idx % colors.length] }}>{getInitials(post.author)}</Avatar>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{post.author}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>{formatRelativeTime(post.time)}</Typography>
              </Box>
            </Box>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>{post.content}</Typography>
            <Divider sx={{ mb: 1.5 }} />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton size="small" onClick={() => toggleLike(post.id)} sx={{ color: post.liked ? 'error.main' : 'text.secondary' }}>
                {post.liked ? <FavoriteIcon sx={{ fontSize: 18 }} /> : <FavoriteBorderIcon sx={{ fontSize: 18 }} />}
              </IconButton>
              <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>{post.likes}</Typography>
              <IconButton size="small" sx={{ color: 'text.secondary' }}><ChatBubbleOutlineIcon sx={{ fontSize: 18 }} /></IconButton>
              <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>{post.comments}</Typography>
              <IconButton size="small" sx={{ color: 'text.secondary' }}><ShareOutlinedIcon sx={{ fontSize: 18 }} /></IconButton>
              <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>{post.shares}</Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
