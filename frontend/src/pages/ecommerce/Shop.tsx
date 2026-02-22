import { useEffect, useState } from 'react';
import {
  Box, Card, CardContent, Chip, Grid, LinearProgress, Rating, Typography,
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PageHeader from '../../components/common/PageHeader';
import SearchFilter from '../../components/common/SearchFilter';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingState from '../../components/common/LoadingState';
import { fetchAll } from '../../api/client';
import { products as allProducts } from '../../api/mock/data';
import { formatCurrency } from '../../utils/format';
import type { Product } from '../../types';

const categoryColors: Record<string, string> = {
  Software: '#6366f1', Development: '#0ea5e9', Analytics: '#22c55e',
  DevOps: '#f59e0b', Design: '#ec4899', Storage: '#8b5cf6', Marketing: '#ef4444',
};

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    void fetchAll(allProducts).then((d) => { setProducts(d); setLoading(false); });
  }, []);

  const filtered = products.filter(
    (p) => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <LoadingState fullPage />;

  return (
    <Box>
      <PageHeader
        title="Shop"
        subtitle="Browse and manage products."
        breadcrumbs={[{ label: 'E-Commerce', href: '/ecommerce/shop' }, { label: 'Shop' }]}
        primaryAction={{ label: 'Add Product', onClick: () => {}, icon: <ShoppingCartOutlinedIcon /> }}
      />

      <SearchFilter searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search products…" />

      <Grid container spacing={3}>
        {filtered.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
            <Card
              sx={{
                height: '100%', cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' },
              }}
            >
              <Box sx={{ height: 140, bgcolor: categoryColors[product.category] ?? '#6366f1', opacity: 0.9, borderRadius: '12px 12px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.25rem' }}>{product.name.charAt(0)}</Typography>
              </Box>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{product.name}</Typography>
                    <Chip label={product.category} size="small" sx={{ mt: 0.5, bgcolor: `${categoryColors[product.category] ?? '#6366f1'}15`, color: categoryColors[product.category] ?? '#6366f1', fontWeight: 600 }} />
                  </Box>
                  <StatusBadge status={product.status} />
                </Box>

                {product.description && (
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {product.description}
                  </Typography>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <Rating value={product.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>{product.rating}</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>{formatCurrency(product.price)}</Typography>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="caption" sx={{ color: product.stock > 0 ? 'text.secondary' : 'error.main' }}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </Typography>
                    {product.stock > 0 && (
                      <LinearProgress variant="determinate" value={Math.min((product.stock / 500) * 100, 100)} sx={{ mt: 0.5, height: 3, borderRadius: 1, bgcolor: 'grey.100', '& .MuiLinearProgress-bar': { bgcolor: product.stock > 50 ? 'success.main' : 'warning.main' } }} />
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
