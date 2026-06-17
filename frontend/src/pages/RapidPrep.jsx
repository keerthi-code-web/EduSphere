import React from 'react';

export default function RapidPrep() {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h1 style={{ margin: '0 0 6px 0', color: '#111827' }}>Screen 6: RapidPrep Desk</h1>
      <p style={{ margin: '0 0 32px 0', color: '#6b7280' }}>Take objective-based multiple choice tests assigned by admins.</p>
      
      <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#111827' }}>Available Mock Evaluations</h3>
        
        <div style={{ padding: '20px', border: '1px solid #e5e7eb', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h4 style={{ margin: '0 0 6px 0', color: '#1f2937' }}>Data Structures Practice Test 1</h4>
            <span style={{ fontSize: '13px', color: '#6b7280' }}>Topics: Trees & Hashing Graphs | 10 MCQs</span>
          </div>
          <button style={{ backgroundColor: '#4f46e5', color: '#ffffff', border: 'none', padding: '12px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Start Quiz</button>
        </div>

        <div style={{ padding: '20px', border: '1px solid #e5e7eb', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ margin: '0 0 6px 0', color: '#1f2937' }}>Linear Algebra Basics Mock Quiz</h4>
            <span style={{ fontSize: '13px', color: '#6b7280' }}>Topics: Matrix Transformations | 5 MCQs</span>
          </div>
          <button style={{ backgroundColor: '#4f46e5', color: '#ffffff', border: 'none', padding: '12px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Start Quiz</button>
        </div>
      </div>
    </div>
  );
}