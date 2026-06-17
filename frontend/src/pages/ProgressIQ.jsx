import React from 'react';

export default function ProgressIq() {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h1 style={{ margin: '0 0 6px 0', color: '#111827' }}>Screen 7: ProgressIQ Performance Analytics</h1>
      <p style={{ margin: '0 0 32px 0', color: '#6b7280' }}>Analyze your mock exam scores and productivity metrics visual profiles.</p>
      
      <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 8px 0', color: '#111827' }}>Performance Progress Trend Curves</h3>
        <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#6b7280' }}>Visual metrics demonstrating continuous growth parameters.</p>
        
        {/* Placeholder Box where Chart.js will hook in Phase 3 */}
        <div style={{ height: '220px', backgroundColor: '#f9fafb', border: '2px dashed #cbd5e1', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#6b7280', fontWeight: '500' }}>
          📈 [Chart.js Node: Live Analytics Progress Trends will be dynamically drawn here in Phase 3]
        </div>
      </div>
    </div>
  );
}