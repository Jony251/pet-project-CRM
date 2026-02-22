import { Chip, type ChipProps } from '@mui/material';

type StatusVariant = 'success' | 'error' | 'warning' | 'info' | 'default';

const statusMap: Record<string, { color: ChipProps['color']; variant: StatusVariant }> = {
  active: { color: 'success', variant: 'success' },
  completed: { color: 'success', variant: 'success' },
  paid: { color: 'success', variant: 'success' },
  done: { color: 'success', variant: 'success' },
  inactive: { color: 'error', variant: 'error' },
  cancelled: { color: 'error', variant: 'error' },
  overdue: { color: 'error', variant: 'error' },
  pending: { color: 'warning', variant: 'warning' },
  processing: { color: 'info', variant: 'info' },
  due: { color: 'warning', variant: 'warning' },
  draft: { color: 'default', variant: 'default' },
  refunded: { color: 'error', variant: 'error' },
  paused: { color: 'warning', variant: 'warning' },
  archived: { color: 'default', variant: 'default' },
  todo: { color: 'default', variant: 'default' },
  in_progress: { color: 'info', variant: 'info' },
  review: { color: 'warning', variant: 'warning' },
};

interface StatusBadgeProps {
  status: string;
  size?: 'small' | 'medium';
}

export default function StatusBadge({ status, size = 'small' }: StatusBadgeProps) {
  const config = statusMap[status.toLowerCase()] ?? { color: 'default' as const, variant: 'default' as const };
  const label = status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <Chip
      label={label}
      size={size}
      color={config.color}
      variant="outlined"
      sx={{ fontSize: '0.6875rem', height: size === 'small' ? 24 : 28, fontWeight: 600 }}
    />
  );
}
