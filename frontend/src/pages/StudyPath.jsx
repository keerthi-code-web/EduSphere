import React from 'react';

export default function StudyPath() {
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h1 style={{ margin: '0 0 6px 0', color: '#111827' }}>StudyPath Blueprint</h1>
      <p style={{ margin: '0 0 32px 0', color: '#6b7280' }}>Allocate self-study targets to ensure consistent preparation.</p>
      
      <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#111827' }}>Weekly Hour Grid Allocator</h3>
        <div style={{ display: 'flex', gap: '12px' }}>
          {weekDays.map(day => (
            <div key={day} style={{ flex: 1, padding: '16px 8px', backgroundColor: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: '14px', color: '#4b5563', fontWeight: '600' }}>{day.substring(0,3)}</span>
              <div style={{ margin: '12px 0', fontSize: '22px', fontWeight: 'bold', color: '#4f46e5' }}>4.0 <span style={{ fontSize: '12px', color: '#6b7280' }}>hrs</span></div>
              <button style={{ background: 'none', border: '1px solid #d1d5db', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>Adjust</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}