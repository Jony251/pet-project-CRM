import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import { sidebarColors } from '../theme/palette';
import { useSidebarStore } from '../stores/sidebarStore';

export const SIDEBAR_WIDTH = 256;

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: { label: string; path: string }[];
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: '',
    items: [
      {
        label: 'Dashboard',
        icon: <DashboardOutlinedIcon />,
        children: [
          { label: 'Main', path: '/' },
          { label: 'Analytics', path: '/dashboard/analytics' },
          { label: 'Fintech', path: '/dashboard/fintech' },
        ],
      },
    ],
  },
  {
    title: 'E-Commerce',
    items: [
      {
        label: 'E-Commerce',
        icon: <ShoppingCartOutlinedIcon />,
        children: [
          { label: 'Customers', path: '/ecommerce/customers' },
          { label: 'Orders', path: '/ecommerce/orders' },
          { label: 'Invoices', path: '/ecommerce/invoices' },
          { label: 'Shop', path: '/ecommerce/shop' },
        ],
      },
    ],
  },
  {
    title: 'Community',
    items: [
      {
        label: 'Community',
        icon: <PeopleOutlinedIcon />,
        children: [
          { label: 'Users – Tabs', path: '/community/users-tabs' },
          { label: 'Users – Tiles', path: '/community/users-tiles' },
          { label: 'Profile', path: '/community/profile' },
          { label: 'Feed', path: '/community/feed' },
          { label: 'Forum', path: '/community/forum' },
          { label: 'Meetups', path: '/community/meetups' },
        ],
      },
    ],
  },
  {
    title: 'Finance',
    items: [
      {
        label: 'Finance',
        icon: <AccountBalanceWalletOutlinedIcon />,
        children: [
          { label: 'Cards', path: '/finance/cards' },
          { label: 'Transactions', path: '/finance/transactions' },
        ],
      },
    ],
  },
  {
    title: 'Job Board',
    items: [
      {
        label: 'Job Board',
        icon: <WorkOutlineOutlinedIcon />,
        children: [
          { label: 'Listing', path: '/jobs/listing' },
          { label: 'Company Profile', path: '/jobs/company' },
        ],
      },
    ],
  },
  {
    title: '',
    items: [
      {
        label: 'Tasks',
        icon: <AssignmentOutlinedIcon />,
        children: [
          { label: 'Kanban', path: '/tasks/kanban' },
          { label: 'List', path: '/tasks/list' },
        ],
      },
      { label: 'Messages', icon: <ChatOutlinedIcon />, path: '/messages' },
      { label: 'Calendar', icon: <CalendarTodayOutlinedIcon />, path: '/calendar' },
      { label: 'Campaigns', icon: <CampaignOutlinedIcon />, path: '/campaigns' },
      {
        label: 'Settings',
        icon: <SettingsOutlinedIcon />,
        children: [
          { label: 'Account', path: '/settings/account' },
          { label: 'Notifications', path: '/settings/notifications' },
          { label: 'Apps', path: '/settings/apps' },
          { label: 'Plans', path: '/settings/plans' },
          { label: 'Billing', path: '/settings/billing' },
          { label: 'Feedback', path: '/settings/feedback' },
        ],
      },
      {
        label: 'Utility',
        icon: <BuildOutlinedIcon />,
        children: [
          { label: 'Changelog', path: '/utility/changelog' },
          { label: 'Roadmap', path: '/utility/roadmap' },
          { label: 'FAQs', path: '/utility/faqs' },
          { label: 'Empty State', path: '/utility/empty-state' },
          { label: 'Knowledge Base', path: '/utility/knowledge-base' },
          { label: 'API Docs', path: '/utility/api-docs' },
        ],
      },
    ],
  },
];

function NavItemComponent({ item }: { item: NavItem }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { expandedSections, toggleSection } = useSidebarStore();
  const { setOpen } = useSidebarStore();
  const muiTheme = useTheme();
  const isMobile = !useMediaQuery(muiTheme.breakpoints.up('lg'));

  const hasChildren = !!item.children?.length;
  const isExpanded = expandedSections.includes(item.label);
  const isActive = item.path ? location.pathname === item.path : item.children?.some((c) => location.pathname === c.path);
  const isChildActive = (path: string) => location.pathname === path;

  const handleClick = () => {
    if (hasChildren) {
      toggleSection(item.label);
    } else if (item.path) {
      navigate(item.path);
      if (isMobile) setOpen(false);
    }
  };

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{
          py: 1,
          px: 2,
          mx: 1.5,
          borderRadius: 1,
          mb: 0.25,
          color: isActive && !hasChildren ? sidebarColors.textActive : sidebarColors.text,
          bgcolor: isActive && !hasChildren ? 'rgba(99,102,241,0.15)' : 'transparent',
          '&:hover': { bgcolor: sidebarColors.bgHover, color: sidebarColors.textActive },
          transition: 'all 0.15s',
        }}
      >
        <ListItemIcon sx={{ minWidth: 36, color: 'inherit', '& .MuiSvgIcon-root': { fontSize: 20 } }}>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 500 }} />
        {hasChildren && (
          <Box sx={{ color: sidebarColors.text, display: 'flex' }}>
            {isExpanded ? <ExpandLess sx={{ fontSize: 18 }} /> : <ExpandMore sx={{ fontSize: 18 }} />}
          </Box>
        )}
      </ListItemButton>
      {hasChildren && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List disablePadding>
            {item.children!.map((child) => (
              <ListItemButton
                key={child.path}
                onClick={() => {
                  navigate(child.path);
                  if (isMobile) setOpen(false);
                }}
                sx={{
                  py: 0.75,
                  pl: 7,
                  pr: 2,
                  mx: 1.5,
                  borderRadius: 1,
                  mb: 0.25,
                  color: isChildActive(child.path) ? sidebarColors.textActive : sidebarColors.text,
                  '&:hover': { bgcolor: sidebarColors.bgHover, color: sidebarColors.textActive },
                  position: 'relative',
                  transition: 'all 0.15s',
                  ...(isChildActive(child.path) && {
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 24,
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: '#6366f1',
                    },
                  }),
                }}
              >
                <ListItemText
                  primary={child.label}
                  primaryTypographyProps={{
                    fontSize: '0.8125rem',
                    fontWeight: isChildActive(child.path) ? 500 : 400,
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const muiTheme = useTheme();
  const isDesktop = useMediaQuery(muiTheme.breakpoints.up('lg'));

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: sidebarColors.bg,
        overflowY: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', px: 3, py: 2.5, gap: 1.5 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: 1,
            background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>M</Typography>
        </Box>
        <Typography variant="h6" sx={{ color: sidebarColors.header, fontWeight: 700, fontSize: '1.125rem' }}>
          pet_CRM
        </Typography>
      </Box>

      <Box sx={{ flex: 1, py: 1 }}>
        {navSections.map((section, sIdx) => (
          <Box key={sIdx}>
            {section.title && (
              <Typography
                sx={{
                  px: 3, pt: 2, pb: 0.5,
                  fontSize: '0.625rem', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                  color: sidebarColors.text, opacity: 0.6,
                }}
              >
                {section.title}
              </Typography>
            )}
            <List disablePadding>
              {section.items.map((item) => (
                <NavItemComponent key={item.label} item={item} />
              ))}
            </List>
          </Box>
        ))}
      </Box>

      <Box sx={{ p: 3, mx: 1.5, mb: 2, borderRadius: 2, bgcolor: 'rgba(99,102,241,0.15)' }}>
        <Typography sx={{ color: sidebarColors.header, fontSize: '0.8125rem', fontWeight: 600, mb: 0.5 }}>
          Need help?
        </Typography>
        <Typography sx={{ color: sidebarColors.text, fontSize: '0.75rem', mb: 1.5, lineHeight: 1.5 }}>
          View full API reference and backend integration guides.
        </Typography>
        <Box
          component={RouterLink}
          to="/utility/api-docs"
          sx={{
            bgcolor: '#6366f1', color: '#fff', border: 'none', borderRadius: 1,
            px: 2, py: 0.75, fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
            '&:hover': { bgcolor: '#4f46e5' }, transition: 'background-color 0.15s',
            textDecoration: 'none', display: 'inline-block',
          }}
        >
          API Documentation
        </Box>
      </Box>
    </Box>
  );

  const paperSx = {
    width: SIDEBAR_WIDTH,
    border: 'none',
    bgcolor: sidebarColors.bg,
  };

  return isDesktop ? (
    <Drawer variant="permanent" sx={{ width: SIDEBAR_WIDTH, flexShrink: 0, '& .MuiDrawer-paper': paperSx }}>
      {drawerContent}
    </Drawer>
  ) : (
    <Drawer variant="temporary" open={open} onClose={onClose} ModalProps={{ keepMounted: true }} sx={{ '& .MuiDrawer-paper': paperSx }}>
      {drawerContent}
    </Drawer>
  );
}
