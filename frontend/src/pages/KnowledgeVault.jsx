import React from 'react';

export default function KnowledgeVault() {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h1 style={{ margin: '0 0 6px 0', color: '#111827' }}>Knowledge Vault</h1>
      <p style={{ margin: '0 0 32px 0', color: '#6b7280' }}>Access shared repository resources alongside your private study notepad.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#1e1b4b' }}>🏛️ Shared Institution Library</h3>
          <div style={{ padding: '12px', border: '1px solid #f3f4f6', borderRadius: '6px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <span>Data_Structures_Core_Notes.pdf</span>
            <span style={{ color: '#4f46e5', fontWeight: 'bold', cursor: 'pointer' }}>Download</span>
          </div>
          <div style={{ padding: '12px', border: '1px solid #f3f4f6', borderRadius: '6px', display: 'flex', justifyContent: 'space-between' }}>
            <span>Linear_Algebra_Formulas.pdf</span>
            <span style={{ color: '#4f46e5', fontWeight: 'bold', cursor: 'pointer' }}>Download</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#10b981' }}>🔒 Personal Sandbox Workspace</h3>
          <textarea placeholder="Type custom equations or research ideas safely here..." style={{ width: '100%', flex: 1, minHeight: '120px', padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box', resize: 'none', outline: 'none' }}></textarea>
          <button style={{ marginTop: '14px', backgroundColor: '#10b981', color: '#ffffff', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', alignSelf: 'flex-end' }}>Save Note Entry</button>
        </div>
      </div>
    </div>
  );
}