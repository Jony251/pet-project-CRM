import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  createTaskThunk,
  deleteTaskThunk,
  fetchTasksThunk,
  updateTaskStatusThunk,
} from "../features/tasks/tasksSlice";
import type { TaskStatus, User } from "../types/models";
import { http } from "../api/http";

const statuses: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE", "BLOCKED"];

const emptyForm = {
  title: "",
  description: "",
  deadline: "",
  assignedUserId: "",
  status: "TODO" as TaskStatus,
};

export default function TasksPage() {
  const dispatch = useAppDispatch();
  const { items, meta, error } = useAppSelector((state) => state.tasks);
  const role = useAppSelector((state) => state.auth.user?.role);
  const canWrite = role === "ADMIN" || role === "MANAGER";

  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "">("");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    void dispatch(
      fetchTasksThunk({
        page,
        limit: 10,
        search: search || undefined,
        status: statusFilter || undefined,
      })
    );
  }, [dispatch, page, search, statusFilter]);

  useEffect(() => {
    if (!canWrite) {
      return;
    }
    void (async () => {
      const response = await http.get<{ items: User[] }>("/users", {
        params: { page: 1, limit: 200 },
      });
      setUsers(response.data.items);
    })();
  }, [canWrite]);

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight={700}>
          Task Management
        </Typography>
        {canWrite && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setForm(emptyForm);
              setOpen(true);
            }}
          >
            New Task
          </Button>
        )}
      </Stack>

      {error && <Alert severity="error">{error}</Alert>}

      <Paper sx={{ p: 2 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <TextField
            label="Search"
            value={search}
            onChange={(event) => {
              setPage(1);
              setSearch(event.target.value);
            }}
            fullWidth
          />
          <TextField
            select
            label="Status"
            value={statusFilter}
            onChange={(event) => {
              setPage(1);
              setStatusFilter(event.target.value as TaskStatus | "");
            }}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">All</MenuItem>
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Paper>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Status</TableCell>
              {canWrite && <TableCell align="right">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description || "-"}</TableCell>
                <TableCell>{task.assignedUser?.name || "-"}</TableCell>
                <TableCell>{task.deadline ? dayjs(task.deadline).format("YYYY-MM-DD") : "-"}</TableCell>
                <TableCell>
                  {canWrite ? (
                    <TextField
                      select
                      size="small"
                      value={task.status}
                      onChange={async (event) => {
                        await dispatch(
                          updateTaskStatusThunk({
                            id: task.id,
                            status: event.target.value as TaskStatus,
                          })
                        );
                      }}
                    >
                      {statuses.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <Chip label={task.status} size="small" />
                  )}
                </TableCell>
                {canWrite && (
                  <TableCell align="right">
                    <Button
                      color="error"
                      onClick={async () => {
                        await dispatch(deleteTaskThunk(task.id));
                        await dispatch(fetchTasksThunk({ page, limit: 10, status: statusFilter || undefined }));
                      }}
                    >
                      Delete
                    </Button>
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

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create Task</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Title"
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              fullWidth
            />
            <TextField
              label="Description"
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              fullWidth
              multiline
              minRows={2}
            />
            <TextField
              label="Deadline"
              type="datetime-local"
              value={form.deadline}
              onChange={(event) => setForm((prev) => ({ ...prev, deadline: event.target.value }))}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              select
              label="Assigned User"
              value={form.assignedUserId}
              onChange={(event) => setForm((prev) => ({ ...prev, assignedUserId: event.target.value }))}
              fullWidth
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name} ({user.role})
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Status"
              value={form.status}
              onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value as TaskStatus }))}
              fullWidth
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
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
              await dispatch(
                createTaskThunk({
                  title: form.title,
                  description: form.description || undefined,
                  deadline: form.deadline ? new Date(form.deadline).toISOString() : undefined,
                  assignedUserId: form.assignedUserId,
                  status: form.status,
                })
              );
              setOpen(false);
              await dispatch(fetchTasksThunk({ page, limit: 10, status: statusFilter || undefined }));
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
