'use client';

import { useState, useEffect, useCallback } from 'react';
import type { StudyRoom } from '@/lib/types';
import { useAuth } from './use-auth';

const STORAGE_KEY = 'mapel-study-rooms';

const getInitialRooms = (): StudyRoom[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const item = window.localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error('Error reading rooms from localStorage', error);
    return [];
  }
};

export const useStudyRoom = (roomId?: string) => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<StudyRoom[]>(getInitialRooms);
  const [currentRoom, setCurrentRoom] = useState<StudyRoom | null>(null);

  useEffect(() => {
    setRooms(getInitialRooms());
  }, []);

  useEffect(() => {
    if (roomId) {
      const room = rooms.find(r => r.id === roomId) || null;
      setCurrentRoom(room);
    }
  }, [roomId, rooms]);

  const updateLocalStorage = (updatedRooms: StudyRoom[]) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRooms));
      setRooms(updatedRooms);
    } catch (error) {
      console.error('Error saving rooms to localStorage', error);
    }
  };

  const createRoom = useCallback((name: string): string | null => {
    if (!user) return null;
    const newRoomId = `room-${Date.now().toString(36)}`;
    const newRoom: StudyRoom = {
      id: newRoomId,
      name,
      creatorId: user.id,
      members: [user.id],
      messages: [],
      sharedGoals: [],
    };
    const updatedRooms = [...rooms, newRoom];
    updateLocalStorage(updatedRooms);
    return newRoomId;
  }, [user, rooms]);

  const joinRoom = useCallback((id: string): boolean => {
    if (!user) return false;
    const roomExists = rooms.find(r => r.id === id);
    if (roomExists && !roomExists.members.includes(user.id)) {
      const updatedRooms = rooms.map(r => 
        r.id === id ? { ...r, members: [...r.members, user.id] } : r
      );
      updateLocalStorage(updatedRooms);
      return true;
    }
    return false;
  }, [user, rooms]);
  
  const sendMessage = useCallback((message: string) => {
    if (!user || !roomId) return;

    const newMessage = {
        userId: user.id,
        username: user.username,
        message,
        timestamp: Date.now()
    };
    
    const updatedRooms = rooms.map(r => 
      r.id === roomId ? { ...r, messages: [...r.messages, newMessage] } : r
    );
    updateLocalStorage(updatedRooms);

  }, [user, roomId, rooms]);


  return { rooms, currentRoom, createRoom, joinRoom, sendMessage };
};
