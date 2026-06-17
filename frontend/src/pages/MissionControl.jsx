import React, { useState } from 'react';

export default function MissionControl() {
  const [tasks] = useState([
    { id: 1, title: 'Revise Data Structures Assignment 2', date: '2026-06-19', status: 'In-Progress' },
    { id: 2, title: 'Draft Relational Database Schemas', date: '2026-06-22', status: 'Pending' }
  ]);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h1 style={{ margin: '0 0 6px 0', color: '#111827' }}>Mission Control</h1>
      <p style={{ margin: '0 0 32px 0', color: '#6b7280' }}>Manage, create, and filter your academic development schedule.</p>
      
      <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <input placeholder="Add a new task description..." style={{ flex: 1, padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none' }} />
          <input type="date" style={{ padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none' }} />
          <button style={{ backgroundColor: '#4f46e5', color: '#ffffff', padding: '0 24px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Add Task</button>
        </div>

        <h3 style={{ margin: '32px 0 16px 0', color: '#1f2937' }}>Current Task Backlog</h3>
        {tasks.map(t => (
          <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #f3f4f6' }}>
            <div>
              <span style={{ fontWeight: '600', color: '#374151' }}>{t.title}</span>
              <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>Deadline: {t.date}</div>
            </div>
            <span style={{ backgroundColor: t.status === 'Pending' ? '#fee2e2' : '#fef3c7', color: t.status === 'Pending' ? '#ef4444' : '#d97706', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>{t.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}