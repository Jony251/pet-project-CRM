import { useState } from 'react';
import {
  Avatar, Badge, Box, Card, Divider, IconButton, InputBase, List, ListItemButton,
  ListItemText, Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PageHeader from '../../components/common/PageHeader';
import { conversations, messages as allMessages } from '../../api/mock/data';
import { formatRelativeTime, getInitials } from '../../utils/format';

export default function Messages() {
  const [activeConvo, setActiveConvo] = useState(conversations[0].id);
  const [newMessage, setNewMessage] = useState('');
  const active = conversations.find((c) => c.id === activeConvo)!;

  return (
    <Box>
      <PageHeader title="Messages" subtitle="Stay connected with your team." />
      <Card sx={{ display: 'flex', minHeight: 500, overflow: 'hidden' }}>
        <Box sx={{ width: { xs: activeConvo ? 0 : '100%', md: 320 }, borderRight: '1px solid', borderColor: 'divider', display: { xs: activeConvo ? 'none' : 'block', md: 'block' }, flexShrink: 0 }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ fontSize: '0.9375rem', fontWeight: 700 }}>Conversations</Typography>
          </Box>
          <Divider />
          <List disablePadding>
            {conversations.map((c) => (
              <ListItemButton key={c.id} selected={c.id === activeConvo} onClick={() => setActiveConvo(c.id)} sx={{ px: 2, py: 1.5, gap: 1.5 }}>
                <Badge variant="dot" invisible={!c.online} sx={{ '& .MuiBadge-badge': { bgcolor: '#22c55e', border: '2px solid', borderColor: 'background.paper' } }}>
                  <Avatar sx={{ width: 40, height: 40, bgcolor: '#6366f1', fontSize: '0.875rem' }}>{getInitials(c.participantName)}</Avatar>
                </Badge>
                <ListItemText
                  primary={c.participantName}
                  secondary={c.lastMessage}
                  primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: c.unreadCount > 0 ? 700 : 500 }}
                  secondaryTypographyProps={{ fontSize: '0.75rem', noWrap: true }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5, flexShrink: 0 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.6875rem' }}>{formatRelativeTime(c.lastMessageTime)}</Typography>
                  {c.unreadCount > 0 && (
                    <Box sx={{ width: 18, height: 18, borderRadius: '50%', bgcolor: 'primary.main', color: '#fff', fontSize: '0.625rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {c.unreadCount}
                    </Box>
                  )}
                </Box>
              </ListItemButton>
            ))}
          </List>
        </Box>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{ width: 36, height: 36, bgcolor: '#6366f1', fontSize: '0.8125rem' }}>{getInitials(active.participantName)}</Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{active.participantName}</Typography>
              <Typography variant="caption" sx={{ color: active.online ? 'success.main' : 'text.secondary' }}>{active.online ? 'Online' : 'Offline'}</Typography>
            </Box>
          </Box>

          <Box sx={{ flex: 1, p: 2, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {allMessages.map((msg) => {
              const isMe = msg.senderId === 'me';
              return (
                <Box key={msg.id} sx={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
                  <Box sx={{ maxWidth: '70%', bgcolor: isMe ? 'primary.main' : 'grey.100', color: isMe ? '#fff' : 'text.primary', borderRadius: 2, px: 2, py: 1.5 }}>
                    <Typography variant="body2">{msg.content}</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.7, mt: 0.5, display: 'block' }}>{formatRelativeTime(msg.timestamp)}</Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', display: 'flex', gap: 1 }}>
            <InputBase
              fullWidth
              placeholder="Type a message…"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              sx={{ bgcolor: 'background.default', borderRadius: 1, px: 2, py: 1, fontSize: '0.875rem' }}
            />
            <IconButton color="primary" disabled={!newMessage.trim()} aria-label="send message">
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
