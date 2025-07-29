'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Note {
  _id: string;
  content: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData));
    fetchNotes(token);
  }, []);

  const fetchNotes = async (token: string) => {
    try {
      const res = await axios.get('/api/users/notes/list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res)
      setNotes(res.data.notes);
    } catch (err) {
      console.error('Failed to load notes:', err);
    }
  };

  const handleCreateNote = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      setLoading(true);
      const res = await axios.post('/api/users/notes/create', {content:newNote}, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setNewNote('')
      setNotes((prev) => [...prev, res.data.note]);
    } catch (err) {
      console.error('Failed to create note:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    console.log(noteId)
    try {
      await axios.delete(`/api/users/notes/delete/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes((prev) => prev.filter((note) => note._id !== noteId));
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white shadow-xl rounded-xl p-6 space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 relative">
              <Image src="/logo.png" alt="Logo" fill className="rounded-full object-contain" />
            </div>
            <span className="text-lg text-black sm:text-xl font-semibold">Dashboard</span>
          </div>
          <button
            onClick={handleSignOut}
            className="text-blue-500 hover:underline text-sm sm:text-base"
          >
            Sign Out
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
          <h2 className="font-bold text-black text-lg sm:text-xl">Welcome, {user.name}!</h2>
          <p className="text-sm text-gray-600 mt-1">Email: {user.email}</p>
        </div>

        {/* Create Note Button */}
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write your note..."
          className="border border-gray-200 p-2 rounded-lg text-black w-full"
        />

        <button
          onClick={handleCreateNote}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
        >
          {loading ? 'Creating...' : 'Create Note'}
        </button>

        {/* Notes List */}
        <div>
          <h3 className="font-semibold text-black text-lg mb-2">Notes</h3>
          {notes.length === 0 ? (
            <p className="text-sm text-gray-500">No notes yet. Create one!</p>
          ) : (
            notes.map((note) => (
              <div
                key={note._id}
                className="flex justify-between items-center bg-white border rounded-lg px-4 py-2 mb-2 shadow-sm hover:shadow-md transition"
              >
                <span className="text-sm text-black sm:text-base">{note.content}</span>
                <button
                  onClick={() => handleDeleteNote(note._id)}
                  className="text-red-500 hover:text-red-700 text-lg"
                  title="Delete Note"
                >
                  <Image src='/delete.png' width={20} height={20} alt='delete'/>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
