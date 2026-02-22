import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
  open: boolean;
  collapsed: boolean;
  expandedSections: string[];
  toggle: () => void;
  setOpen: (open: boolean) => void;
  toggleCollapsed: () => void;
  toggleSection: (section: string) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      open: false,
      collapsed: false,
      expandedSections: ['Dashboard'],

      toggle: () => set((s) => ({ open: !s.open })),
      setOpen: (open) => set({ open }),
      toggleCollapsed: () => set((s) => ({ collapsed: !s.collapsed })),
      toggleSection: (section) =>
        set((s) => ({
          expandedSections: s.expandedSections.includes(section)
            ? s.expandedSections.filter((id) => id !== section)
            : [...s.expandedSections, section],
        })),
    }),
    {
      name: 'mosaic-sidebar',
      partialize: (state) => ({
        collapsed: state.collapsed,
        expandedSections: state.expandedSections,
      }),
    },
  ),
);
