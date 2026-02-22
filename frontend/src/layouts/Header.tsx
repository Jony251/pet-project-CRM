import { useState } from 'react';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const muiTheme = useTheme();
  const isDesktop = useMediaQuery(muiTheme.breakpoints.up('lg'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'rgba(241, 245, 249, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ gap: 1, minHeight: { xs: 56, sm: 64 } }}>
        {!isDesktop && (
          <IconButton
            onClick={onMenuClick}
            edge="start"
            aria-label="open sidebar"
            sx={{ color: 'text.secondary' }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: searchOpen ? 'background.paper' : 'transparent',
            border: searchOpen ? '1px solid' : '1px solid transparent',
            borderColor: searchOpen ? 'divider' : 'transparent',
            borderRadius: 1,
            px: 1,
            transition: 'all 0.2s',
            width: searchOpen ? 280 : 'auto',
          }}
        >
          <IconButton
            size="small"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="search"
            sx={{ color: 'text.secondary' }}
          >
            <SearchIcon sx={{ fontSize: 20 }} />
          </IconButton>
          {searchOpen && (
            <InputBase
              autoFocus
              placeholder="Search…"
              sx={{
                ml: 0.5,
                fontSize: '0.875rem',
                flex: 1,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onBlur={() => setSearchOpen(false)}
            />
          )}
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Tooltip title="Notifications" arrow>
          <IconButton
            size="small"
            aria-label="notifications"
            sx={{ color: 'text.secondary' }}
          >
            <Badge
              badgeContent={4}
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '0.625rem',
                  height: 16,
                  minWidth: 16,
                },
              }}
            >
              <NotificationsNoneOutlinedIcon sx={{ fontSize: 20 }} />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title="Help" arrow>
          <IconButton
            size="small"
            aria-label="help"
            sx={{ color: 'text.secondary' }}
          >
            <HelpOutlineIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 1, my: 1 }} />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            cursor: 'pointer',
            py: 0.5,
            px: 1,
            borderRadius: 1,
            '&:hover': { bgcolor: 'action.hover' },
            transition: 'background-color 0.15s',
          }}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          role="button"
          aria-label="user menu"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setAnchorEl(e.currentTarget);
          }}
        >
          <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', lineHeight: 1.2 }}>
              Acme Inc.
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Administrator
            </Typography>
          </Box>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: '#6366f1',
              fontSize: '0.8125rem',
            }}
            alt="User avatar"
          >
            AI
          </Avatar>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          slotProps={{
            paper: {
              sx: {
                mt: 1,
                minWidth: 180,
                borderRadius: 2,
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
                border: '1px solid',
                borderColor: 'divider',
              },
            },
          }}
        >
          <MenuItem sx={{ fontSize: '0.875rem' }}>My Profile</MenuItem>
          <MenuItem sx={{ fontSize: '0.875rem' }}>Settings</MenuItem>
          <Divider />
          <MenuItem sx={{ fontSize: '0.875rem', color: 'error.main' }}>Sign Out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
