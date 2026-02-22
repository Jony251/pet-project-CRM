import { useEffect, useState } from 'react';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useThemeStore } from '../stores/themeStore';
import { useNotificationStore } from '../stores/notificationStore';
import { getInitials, formatRelativeTime } from '../utils/format';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { mode, toggleMode } = useThemeStore();
  const { notifications, unreadCount, markAsRead, markAllAsRead, fetchNotifications } = useNotificationStore();

  useEffect(() => { void fetchNotifications(); }, [fetchNotifications]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
    navigate('/signin');
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: mode === 'light' ? 'rgba(241,245,249,0.8)' : 'rgba(15,23,42,0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ gap: 1, minHeight: { xs: 56, sm: 64 } }}>
        <IconButton onClick={onMenuClick} edge="start" aria-label="open sidebar" sx={{ display: { lg: 'none' }, color: 'text.secondary' }}>
          <MenuIcon />
        </IconButton>

        <Box
          sx={{
            display: 'flex', alignItems: 'center',
            bgcolor: searchOpen ? 'background.paper' : 'transparent',
            border: '1px solid', borderColor: searchOpen ? 'divider' : 'transparent',
            borderRadius: 1, px: 1, transition: 'all 0.2s', width: searchOpen ? 280 : 'auto',
          }}
        >
          <IconButton size="small" onClick={() => setSearchOpen(!searchOpen)} aria-label="search" sx={{ color: 'text.secondary' }}>
            <SearchIcon sx={{ fontSize: 20 }} />
          </IconButton>
          {searchOpen && (
            <InputBase
              autoFocus
              placeholder="Search…"
              sx={{ ml: 0.5, fontSize: '0.875rem', flex: 1 }}
              inputProps={{ 'aria-label': 'search' }}
              onBlur={() => setSearchOpen(false)}
            />
          )}
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Tooltip title={mode === 'light' ? 'Dark mode' : 'Light mode'} arrow>
          <IconButton size="small" onClick={toggleMode} aria-label="toggle theme" sx={{ color: 'text.secondary' }}>
            {mode === 'light' ? <DarkModeOutlinedIcon sx={{ fontSize: 20 }} /> : <LightModeOutlinedIcon sx={{ fontSize: 20 }} />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Notifications" arrow>
          <IconButton size="small" aria-label="notifications" sx={{ color: 'text.secondary' }} onClick={(e) => setNotifAnchor(e.currentTarget)}>
            <Badge badgeContent={unreadCount} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.625rem', height: 16, minWidth: 16 } }}>
              <NotificationsNoneOutlinedIcon sx={{ fontSize: 20 }} />
            </Badge>
          </IconButton>
        </Tooltip>

        <Popover
          open={Boolean(notifAnchor)}
          anchorEl={notifAnchor}
          onClose={() => setNotifAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          slotProps={{
            paper: {
              sx: {
                width: 320, maxHeight: 400, mt: 1, borderRadius: 2,
                border: '1px solid', borderColor: 'divider',
              },
            },
          }}
        >
          <Box sx={{ px: 2, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontSize: '0.9375rem' }}>Notifications</Typography>
            {unreadCount > 0 && (
              <Typography
                variant="caption"
                sx={{ color: 'primary.main', cursor: 'pointer', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}
                onClick={markAllAsRead}
              >
                Mark all read
              </Typography>
            )}
          </Box>
          <Divider />
          <List disablePadding sx={{ maxHeight: 300, overflow: 'auto' }}>
            {notifications.length === 0 ? (
              <Box sx={{ py: 4, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>No notifications</Typography>
              </Box>
            ) : (
              notifications.slice(0, 8).map((n) => (
                <ListItemButton
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  sx={{
                    py: 1.5, px: 2, gap: 1.5,
                    bgcolor: n.read ? 'transparent' : (mode === 'light' ? 'rgba(99,102,241,0.04)' : 'rgba(99,102,241,0.08)'),
                    '&:hover': { bgcolor: mode === 'light' ? 'grey.50' : 'grey.800' },
                  }}
                >
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: n.read ? 'transparent' : 'primary.main', flexShrink: 0, mt: 0.5 }} />
                  <ListItemText
                    primary={n.title}
                    secondary={`${n.message} · ${formatRelativeTime(n.createdAt ?? n.time ?? '')}`}
                    primaryTypographyProps={{ fontSize: '0.8125rem', fontWeight: n.read ? 400 : 600 }}
                    secondaryTypographyProps={{ fontSize: '0.75rem', noWrap: true }}
                  />
                </ListItemButton>
              ))
            )}
          </List>
        </Popover>

        <Tooltip title="Help" arrow>
          <IconButton size="small" aria-label="help" sx={{ color: 'text.secondary' }}>
            <HelpOutlineIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 1, my: 1 }} />

        <Box
          sx={{
            display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer',
            py: 0.5, px: 1, borderRadius: 1, '&:hover': { bgcolor: 'action.hover' }, transition: 'background-color 0.15s',
          }}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          role="button" aria-label="user menu" tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setAnchorEl(e.currentTarget); }}
        >
          <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', lineHeight: 1.2 }}>
              {user?.name ?? 'Acme Inc.'}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {user?.role ?? 'Administrator'}
            </Typography>
          </Box>
          <Avatar sx={{ width: 32, height: 32, bgcolor: '#6366f1', fontSize: '0.8125rem' }} alt="User avatar">
            {getInitials(user?.name ?? 'AI')}
          </Avatar>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          slotProps={{ paper: { sx: { mt: 1, minWidth: 180, borderRadius: 2, border: '1px solid', borderColor: 'divider' } } }}
        >
          <MenuItem sx={{ fontSize: '0.875rem' }} onClick={() => { setAnchorEl(null); navigate('/settings/account'); }}>My Profile</MenuItem>
          <MenuItem sx={{ fontSize: '0.875rem' }} onClick={() => { setAnchorEl(null); navigate('/settings/account'); }}>Settings</MenuItem>
          <Divider />
          <MenuItem sx={{ fontSize: '0.875rem', color: 'error.main' }} onClick={handleLogout}>Sign Out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
