import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  createClientThunk,
  deleteClientThunk,
  fetchClientsThunk,
  updateClientThunk,
} from "../features/clients/clientsSlice";
import { http } from "../api/http";
import type { Client, User } from "../types/models";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  source: "",
  assignedManagerId: "",
};

export default function ClientsPage() {
  const dispatch = useAppDispatch();
  const { items, meta, error } = useAppSelector((state) => state.clients);
  const role = useAppSelector((state) => state.auth.user?.role);
  const canWrite = role === "ADMIN" || role === "MANAGER";

  const [managers, setManagers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    void dispatch(
      fetchClientsThunk({
        page,
        limit: 10,
        search: search || undefined,
        source: source || undefined,
      })
    );
  }, [dispatch, page, search, source]);

  useEffect(() => {
    if (!canWrite) {
      return;
    }
    void (async () => {
      const response = await http.get<{ items: User[] }>("/users", {
        params: { role: "MANAGER", limit: 100, page: 1 },
      });
      setManagers(response.data.items);
    })();
  }, [canWrite]);

  const sourceOptions = useMemo(() => ["Website", "Referral", "Ads", "Cold Call"], []);

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight={700}>
          Customers
        </Typography>
        {canWrite && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditing(null);
              setForm(emptyForm);
              setOpen(true);
            }}
          >
            Add Customer
          </Button>
        )}
      </Stack>

      {error && <Alert severity="error">{error}</Alert>}

      <Paper sx={{ p: 2 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <TextField
            label="Search by name/email/company"
            value={search}
            onChange={(event) => {
              setPage(1);
              setSearch(event.target.value);
            }}
            fullWidth
          />
          <TextField
            select
            label="Lead source"
            value={source}
            onChange={(event) => {
              setPage(1);
              setSource(event.target.value);
            }}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">All</MenuItem>
            {sourceOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Paper>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Manager</TableCell>
              {canWrite && <TableCell align="right">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.company || "-"}</TableCell>
                <TableCell>{client.phone || "-"}</TableCell>
                <TableCell>{client.source || "-"}</TableCell>
                <TableCell>{client.assignedManager?.name || "-"}</TableCell>
                {canWrite && (
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        setEditing(client);
                        setForm({
                          name: client.name,
                          email: client.email,
                          phone: client.phone ?? "",
                          company: client.company ?? "",
                          source: client.source ?? "",
                          assignedManagerId: client.assignedManagerId ?? "",
                        });
                        setOpen(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={async () => {
                        await dispatch(deleteClientThunk(client.id));
                        await dispatch(fetchClientsThunk({ page, limit: 10, search, source }));
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Box display="flex" justifyContent="center">
        <Pagination
          page={meta.page}
          count={Math.max(meta.totalPages, 1)}
          onChange={(_, value) => setPage(value)}
        />
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? "Edit Customer" : "Create Customer"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Name"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              fullWidth
            />
            <TextField
              label="Email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              fullWidth
            />
            <TextField
              label="Phone"
              value={form.phone}
              onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
              fullWidth
            />
            <TextField
              label="Company"
              value={form.company}
              onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
              fullWidth
            />
            <TextField
              select
              label="Lead source"
              value={form.source}
              onChange={(event) => setForm((prev) => ({ ...prev, source: event.target.value }))}
              fullWidth
            >
              <MenuItem value="">Select source</MenuItem>
              {sourceOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Responsible manager"
              value={form.assignedManagerId}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, assignedManagerId: event.target.value }))
              }
              fullWidth
            >
              <MenuItem value="">Unassigned</MenuItem>
              {managers.map((manager) => (
                <MenuItem key={manager.id} value={manager.id}>
                  {manager.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={async () => {
              const payload = {
                ...form,
                assignedManagerId: form.assignedManagerId || undefined,
                source: form.source || undefined,
                company: form.company || undefined,
                phone: form.phone || undefined,
              };
              if (editing) {
                await dispatch(updateClientThunk({ id: editing.id, payload }));
              } else {
                await dispatch(createClientThunk(payload));
              }
              setOpen(false);
              await dispatch(fetchClientsThunk({ page, limit: 10, search, source }));
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
