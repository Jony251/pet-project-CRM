import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  createDealThunk,
  fetchPipelineThunk,
  moveDealThunk,
} from "../features/deals/dealsSlice";
import type { Client, Deal, DealStatus, User } from "../types/models";
import { http } from "../api/http";

const statuses: DealStatus[] = ["NEW", "CONTACTED", "PROPOSAL", "WON", "LOST"];
const statusLabel: Record<DealStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  PROPOSAL: "Proposal",
  WON: "Won",
  LOST: "Lost",
};

const emptyForm = {
  title: "",
  amount: "",
  clientId: "",
  managerId: "",
  notes: "",
  status: "NEW" as DealStatus,
};

export default function DealsPage() {
  const dispatch = useAppDispatch();
  const { pipeline, error } = useAppSelector((state) => state.deals);
  const role = useAppSelector((state) => state.auth.user?.role);
  const canWrite = role === "ADMIN" || role === "MANAGER";

  const [managerFilter, setManagerFilter] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [managers, setManagers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    void dispatch(fetchPipelineThunk({ managerId: managerFilter || undefined }));
  }, [dispatch, managerFilter]);

  useEffect(() => {
    void (async () => {
      try {
        const clientsResponse = await http.get<{ items: Client[] }>("/clients", {
          params: { page: 1, limit: 200 },
        });
        setClients(clientsResponse.data.items);

        if (canWrite) {
          const managersResponse = await http.get<{ items: User[] }>("/users", {
            params: { role: "MANAGER", page: 1, limit: 200 },
          });
          setManagers(managersResponse.data.items);
        } else {
          setManagers([]);
        }
      } catch {
        setManagers([]);
      }
    })();
  }, [canWrite]);

  const board = useMemo(() => {
    return statuses.map((status) => {
      const found = pipeline.find((column) => column.status === status);
      return (
        found ?? {
          status,
          totalAmount: 0,
          deals: [],
        }
      );
    });
  }, [pipeline]);

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) {
      return;
    }
    const targetStatus = String(over.id) as DealStatus;
    const currentStatus = active.data.current?.status as DealStatus;
    const dealId = String(active.id);
    if (targetStatus === currentStatus) {
      return;
    }
    await dispatch(moveDealThunk({ id: dealId, status: targetStatus }));
    await dispatch(fetchPipelineThunk({ managerId: managerFilter || undefined }));
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight={700}>
          Sales Pipeline
        </Typography>
        <Stack direction="row" spacing={1.5}>
          <TextField
            select
            label="Manager"
            value={managerFilter}
            onChange={(event) => setManagerFilter(event.target.value)}
            size="small"
            sx={{ minWidth: 220 }}
          >
            <MenuItem value="">All managers</MenuItem>
            {managers.map((manager) => (
              <MenuItem key={manager.id} value={manager.id}>
                {manager.name}
              </MenuItem>
            ))}
          </TextField>
          {canWrite && (
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              onClick={() => {
                setForm(emptyForm);
                setOpen(true);
              }}
            >
              New Deal
            </Button>
          )}
        </Stack>
      </Stack>

      {error && <Alert severity="error">{error}</Alert>}

      <DndContext onDragEnd={handleDragEnd}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              lg: "repeat(5, minmax(220px, 1fr))",
            },
            gap: 2,
          }}
        >
          {board.map((column) => (
            <PipelineColumn key={column.status} status={column.status} totalAmount={column.totalAmount}>
              {column.deals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </PipelineColumn>
          ))}
        </Box>
      </DndContext>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Create Deal</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Title"
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              fullWidth
            />
            <TextField
              label="Amount"
              type="number"
              value={form.amount}
              onChange={(event) => setForm((prev) => ({ ...prev, amount: event.target.value }))}
              fullWidth
            />
            <TextField
              select
              label="Client"
              value={form.clientId}
              onChange={(event) => setForm((prev) => ({ ...prev, clientId: event.target.value }))}
              fullWidth
            >
              {clients.map((client) => (
                <MenuItem key={client.id} value={client.id}>
                  {client.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Manager"
              value={form.managerId}
              onChange={(event) => setForm((prev) => ({ ...prev, managerId: event.target.value }))}
              fullWidth
            >
              {managers.map((manager) => (
                <MenuItem key={manager.id} value={manager.id}>
                  {manager.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Status"
              value={form.status}
              onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value as DealStatus }))}
              fullWidth
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {statusLabel[status]}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Notes"
              value={form.notes}
              onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
              fullWidth
              multiline
              minRows={2}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={async () => {
              await dispatch(
                createDealThunk({
                  title: form.title,
                  amount: Number(form.amount),
                  clientId: form.clientId,
                  managerId: form.managerId,
                  status: form.status,
                  notes: form.notes || undefined,
                })
              );
              setOpen(false);
              await dispatch(fetchPipelineThunk({ managerId: managerFilter || undefined }));
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

function PipelineColumn({
  status,
  totalAmount,
  children,
}: {
  status: DealStatus;
  totalAmount: number;
  children: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <Card
      ref={setNodeRef}
      sx={{
        minHeight: 380,
        bgcolor: isOver ? "action.hover" : "background.paper",
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
          <Typography variant="subtitle1" fontWeight={700}>
            {statusLabel[status]}
          </Typography>
          <Chip label={`$${totalAmount.toLocaleString()}`} size="small" color="primary" variant="outlined" />
        </Stack>
        <Stack spacing={1.2}>{children}</Stack>
      </CardContent>
    </Card>
  );
}

function DealCard({ deal }: { deal: Deal }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: deal.id,
    data: {
      status: deal.status,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      sx={{ border: "1px solid", borderColor: "divider" }}
    >
      <CardContent sx={{ "&:last-child": { pb: 1.5 } }}>
        <Typography variant="subtitle2" fontWeight={700}>
          {deal.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {deal.client?.name ?? "Unknown client"}
        </Typography>
        <Typography variant="body2" mt={1}>
          ${deal.amount.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
