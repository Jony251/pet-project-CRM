import { useState } from 'react';
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface FilterOption {
  label: string;
  value: string;
}

interface SearchFilterProps {
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters?: {
    id: string;
    label: string;
    value: string;
    options: FilterOption[];
  }[];
  onFilterChange?: (filterId: string, value: string) => void;
}

export default function SearchFilter({
  searchPlaceholder = 'Search…',
  searchValue,
  onSearchChange,
  filters = [],
  onFilterChange,
}: SearchFilterProps) {
  const [focused, setFocused] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 1.5,
        alignItems: { sm: 'center' },
        mb: 2,
      }}
    >
      <TextField
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={searchPlaceholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: focused ? 'primary.main' : 'text.secondary' }} />
              </InputAdornment>
            ),
            endAdornment: searchValue ? (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => onSearchChange('')} aria-label="clear search">
                  <ClearIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </InputAdornment>
            ) : null,
          },
        }}
        sx={{ minWidth: { sm: 260 } }}
        aria-label="search"
      />

      {filters.map((filter) => (
        <FormControl key={filter.id} size="small" sx={{ minWidth: 140 }}>
          <InputLabel>{filter.label}</InputLabel>
          <Select
            value={filter.value}
            label={filter.label}
            onChange={(e: SelectChangeEvent) => onFilterChange?.(filter.id, e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            {filter.options.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </Box>
  );
}
