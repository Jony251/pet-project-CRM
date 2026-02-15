import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchDashboardThunk, fetchRevenueThunk } from "../features/analytics/analyticsSlice";

const colors = ["#1976d2", "#42a5f5", "#66bb6a", "#ffa726", "#ef5350"];

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { dashboard, revenue } = useAppSelector((state) => state.analytics);
  const [period, setPeriod] = useState<"monthly" | "quarterly" | "yearly">("monthly");

  useEffect(() => {
    void dispatch(fetchDashboardThunk());
  }, [dispatch]);

  useEffect(() => {
    void dispatch(fetchRevenueThunk({ period }));
  }, [dispatch, period]);

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={700}>
        Analytics Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <MetricCard title="Total Leads" value={dashboard?.totals.totalLeads ?? 0} />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <MetricCard title="Total Deals" value={dashboard?.totals.totalDeals ?? 0} />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <MetricCard title="Conversion Rate" value={`${dashboard?.totals.conversionRate ?? 0}%`} />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <MetricCard title="Revenue Won" value={`$${(dashboard?.totals.revenueWon ?? 0).toLocaleString()}`} />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Deals by Stage
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dashboard?.pipeline ?? []}
                    dataKey="dealsCount"
                    nameKey="status"
                    outerRadius={100}
                    label
                  >
                    {(dashboard?.pipeline ?? []).map((_, index) => (
                      <Cell key={index} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Deals per Manager
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dashboard?.dealsPerManager ?? []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="managerName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="dealsCount" fill="#1976d2" />
                  <Bar dataKey="amount" fill="#66bb6a" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h6">Revenue Trend</Typography>
            <Select
              size="small"
              value={period}
              onChange={(event) => setPeriod(event.target.value as typeof period)}
            >
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="quarterly">Quarterly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </Stack>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={revenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#1976d2" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Stack>
  );
}

function MetricCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4" fontWeight={700} mt={1}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
