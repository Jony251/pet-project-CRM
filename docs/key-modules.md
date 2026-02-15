# Key Module Snippets

## 1) JWT + RBAC middleware

```ts
export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "Missing or invalid authorization header"));
  }
  const token = authHeader.slice("Bearer ".length);
  const payload = verifyJwt(token);
  req.user = { id: payload.sub, role: payload.role, email: payload.email };
  return next();
}

export function authorize(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ApiError(403, "Insufficient permissions"));
    }
    return next();
  };
}
```

## 2) Deal stage transition (Kanban drag-and-drop backend action)

```ts
export async function updateDealStatus(id: string, status: DealStatus) {
  const existing = await prisma.deal.findUnique({ where: { id }, select: { id: true } });
  if (!existing) throw new ApiError(404, "Deal not found");

  return prisma.deal.update({
    where: { id },
    data: { status },
    include: {
      client: { select: { id: true, name: true } },
      manager: { select: { id: true, name: true } },
    },
  });
}
```

## 3) Frontend protected route

```tsx
export default function ProtectedRoute({ children, roles }: Props) {
  const { token, user, initialized } = useAppSelector((state) => state.auth);
  if (!initialized) return <CircularProgress />;
  if (!token || !user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Alert severity="error">No access</Alert>;
  return children;
}
```

## 4) Pipeline drag-drop event handler

```tsx
async function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event;
  if (!over) return;
  const targetStatus = String(over.id) as DealStatus;
  const currentStatus = active.data.current?.status as DealStatus;
  if (targetStatus === currentStatus) return;
  await dispatch(moveDealThunk({ id: String(active.id), status: targetStatus }));
  await dispatch(fetchPipelineThunk({ managerId: managerFilter || undefined }));
}
```
