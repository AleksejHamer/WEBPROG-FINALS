import { useEffect, useState } from 'react';

const API_URL = '/api/guestbook';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });

  const load = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setEntries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({ name: '', message: '' });
        load();
      }
    } catch (err) {
      alert("Failed to save entry.");
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Guestbook (Southwest - Hamer)</h1>
      <form onSubmit={save} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          placeholder="Your Name" 
          value={form.name} 
          onChange={e => setForm({...form, name: e.target.value})} 
          required 
          style={{ padding: '8px' }}
        />
        <textarea 
          placeholder="Your Message" 
          value={form.message} 
          onChange={e => setForm({...form, message: e.target.value})} 
          required 
          style={{ padding: '8px', minHeight: '100px' }}
        />
        <button type="submit" style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Sign Guestbook
        </button>
      </form>
      <hr style={{ margin: '30px 0' }} />
      <div>
        {entries.length === 0 ? <p>No messages yet.</p> : entries.map(e => (
          <div key={e.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
            <strong>{e.name}</strong>
            <p>{e.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}