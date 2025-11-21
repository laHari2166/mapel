
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './use-auth';

interface PersonalNote {
  id: string;
  title: string;
  content: string;
  createdAt: number;
}

const STORAGE_KEY_PREFIX = 'mapel-personal-notes-';

const getInitialNotes = (userId: string): PersonalNote[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const item = window.localStorage.getItem(`${STORAGE_KEY_PREFIX}${userId}`);
    // sort by most recent
    return item ? JSON.parse(item).sort((a: PersonalNote, b: PersonalNote) => b.createdAt - a.createdAt) : [];
  } catch (error) {
    console.error('Error reading personal notes from localStorage', error);
    return [];
  }
};

export const usePersonalNotes = () => {
  const { user } = useAuth();
  const [personalNotes, setPersonalNotes] = useState<PersonalNote[]>([]);

  useEffect(() => {
    if (user) {
      setPersonalNotes(getInitialNotes(user.id));
    } else {
      setPersonalNotes([]);
    }
  }, [user]);

  const updateLocalStorage = useCallback((updatedNotes: PersonalNote[]) => {
    if (user) {
      try {
        const sorted = updatedNotes.sort((a, b) => b.createdAt - a.createdAt);
        window.localStorage.setItem(`${STORAGE_KEY_PREFIX}${user.id}`, JSON.stringify(sorted));
        setPersonalNotes(sorted);
      } catch (error) {
        console.error('Error saving personal notes to localStorage', error);
      }
    }
  }, [user]);

  const addNote = useCallback((title: string, content: string) => {
    const newNote: PersonalNote = {
      id: `note-${Date.now().toString(36)}`,
      title,
      content,
      createdAt: Date.now(),
    };
    const updatedNotes = [...personalNotes, newNote];
    updateLocalStorage(updatedNotes);
  }, [personalNotes, updateLocalStorage]);

  const updateNote = useCallback((id: string, updatedContent: Partial<PersonalNote>) => {
    const updatedNotes = personalNotes.map(note =>
      note.id === id ? { ...note, ...updatedContent, id } : note
    );
    updateLocalStorage(updatedNotes);
  }, [personalNotes, updateLocalStorage]);

  const deleteNote = useCallback((id: string) => {
    const updatedNotes = personalNotes.filter(note => note.id !== id);
    updateLocalStorage(updatedNotes);
  }, [personalNotes, updateLocalStorage]);


  return { personalNotes, addNote, updateNote, deleteNote };
};

