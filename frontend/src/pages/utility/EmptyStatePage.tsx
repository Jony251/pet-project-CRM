import { Box, Card, CardContent } from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import EmptyState from '../../components/common/EmptyState';

export default function EmptyStatePage() {
  return (
    <Box>
      <PageHeader title="Empty State" subtitle="Example empty state component." breadcrumbs={[{ label: 'Utility' }, { label: 'Empty State' }]} />
      <Card>
        <CardContent>
          <EmptyState
            title="No results found"
            description="Try adjusting your search or filter to find what you're looking for. You can also create a new item to get started."
            actionLabel="Create New"
            onAction={() => {}}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
