import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ContactStatus = 'new' | 'read' | 'replied';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  rating: number;
  status: ContactStatus;
  createdAt: string;
  note: string;
}

interface ContactStore {
  contacts: ContactSubmission[];
  addContact: (data: Omit<ContactSubmission, 'id' | 'status' | 'createdAt' | 'note'>) => void;
  updateStatus: (id: string, status: ContactStatus) => void;
  updateNote: (id: string, note: string) => void;
  deleteContact: (id: string) => void;
}

export const useContactStore = create<ContactStore>()(
  persist(
    (set) => ({
      contacts: [],
      addContact: (data) =>
        set((state) => ({
          contacts: [
            {
              ...data,
              id: `contact-${Date.now()}`,
              status: 'new',
              createdAt: new Date().toISOString(),
              note: '',
            },
            ...state.contacts,
          ],
        })),
      updateStatus: (id, status) =>
        set((state) => ({
          contacts: state.contacts.map((c) => (c.id === id ? { ...c, status } : c)),
        })),
      updateNote: (id, note) =>
        set((state) => ({
          contacts: state.contacts.map((c) => (c.id === id ? { ...c, note } : c)),
        })),
      deleteContact: (id) =>
        set((state) => ({
          contacts: state.contacts.filter((c) => c.id !== id),
        })),
    }),
    { name: 'ocnv-contacts' }
  )
);
