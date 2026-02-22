import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import PageHeader from '../../components/common/PageHeader';

const cards = [
  { id: 1, name: 'Visa ending in 4242', type: 'Visa', limit: 10000, balance: 3240, color: '#6366f1' },
  { id: 2, name: 'Mastercard ending in 8888', type: 'Mastercard', limit: 25000, balance: 12450, color: '#0ea5e9' },
  { id: 3, name: 'Amex ending in 1234', type: 'Amex', limit: 50000, balance: 31200, color: '#22c55e' },
];

export default function FinanceCards() {
  return (
    <Box>
      <PageHeader
        title="Cards"
        subtitle="Manage your payment methods."
        breadcrumbs={[{ label: 'Finance', href: '/finance/cards' }, { label: 'Cards' }]}
        primaryAction={{ label: 'Add Card', onClick: () => {}, icon: <AddCardOutlinedIcon /> }}
      />
      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid key={card.id} size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card sx={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}cc)`, color: '#fff', overflow: 'visible' }}>
              <CardContent sx={{ py: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>{card.type}</Typography>
                  <Typography sx={{ opacity: 0.7, fontSize: '0.8125rem' }}>•••• {card.name.slice(-4)}</Typography>
                </Box>
                <Typography sx={{ opacity: 0.7, fontSize: '0.75rem', mb: 0.5 }}>Current Balance</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '1.75rem', mb: 3 }}>
                  ${card.balance.toLocaleString()}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ opacity: 0.7, fontSize: '0.75rem' }}>Limit: ${card.limit.toLocaleString()}</Typography>
                  <Button size="small" sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}>
                    Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
