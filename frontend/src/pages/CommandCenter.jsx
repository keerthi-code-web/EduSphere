import React, { useState } from 'react';

export default function CommandCenter({ username = "Keerthi B", onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Performance metrics tracking tokens
  const metrics = [
    { title: "Productivity Score", score: "84%", color: "#3B82F6", icon: "⚡", change: "+4%" },
    { title: "Consistency Score", score: "92%", color: "#10B981", icon: "📅", change: "12 Days" },
    { title: "Exam Readiness", score: "78%", color: "#F59E0B", icon: "🎯", change: "4 Modules" },
    { title: "Overall Score", score: "85%", color: "#8B5CF6", icon: "🏆", change: "Top 10%" }
  ];

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      width: '100%', 
      height: '100vh', 
      margin: 0, 
      padding: 0, 
      fontFamily: 'system-ui, -apple-system, sans-serif', 
      backgroundColor: '#F8FAFC', 
      overflow: 'hidden' /* Strictly lock layout from outer browser page scrollbars */
    }}>
      
      {/* =========================================================================
        INJECTED CSS STYLE TAG: Dynamically hides scrollbar bars completely 
        for a clean application interface while allowing natural scrolling.
        =========================================================================
      */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

      {/* =========================================================================
          1. HEADER ACTION BAR
          ========================================================================= */}
      <header style={{ 
        height: '65px', 
        backgroundColor: '#FFFFFF', 
        borderBottom: '1px solid #E2E8F0', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '0 24px', 
        boxSizing: 'border-box',
        flexShrink: 0 
      }}>
        
        {/* Workspace Search Box */}
        <div style={{ position: 'relative', width: '340px' }}>
          <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748B', fontSize: '15px' }}>🔍</span>
          <input 
            type="text" 
            placeholder="Search modules, tasks, analytics files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '9px 14px 9px 38px', fontSize: '14px', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', backgroundColor: '#F8FAFC', color: '#0F172A', boxSizing: 'border-box' }}
          />
        </div>

        {/* Profile and Notification Center */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Notification Alert Trigger */}
          <div style={{ position: 'relative', cursor: 'pointer', width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
            <span style={{ fontSize: '16px' }}>🔔</span>
            <span style={{ position: 'absolute', top: '3px', right: '3px', width: '7px', height: '7px', backgroundColor: '#EF4444', borderRadius: '50%' }}></span>
          </div>

          {/* User Meta Data Info Panel */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '4px', borderLeft: '1px solid #E2E8F0' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#4F46E5', color: '#FFFFFF', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '700', fontSize: '13px', marginLeft: '8px' }}>
              {username.charAt(0)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#0F172A' }}>{username}</span>
              <span style={{ fontSize: '11px', color: '#64748B' }}>B.Tech AIDS Student</span>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. MAIN VIEW AREA (Completely scrollbar-free UI experience)
          ========================================================================= */}
      <main 
        className="no-scrollbar"
        style={{ 
          flex: 1, 
          padding: '24px', 
          overflowY: 'auto', /* Allows wheel scrolling while the injected CSS hides the physical scrollbar track */
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}
      >
        
        {/* 3. WELCOME GREETING CAPTION */}
        <div style={{ margin: 0 }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0B133A', margin: 0, letterSpacing: '-0.5px' }}>
            Welcome back to your Hub, {username.split(' ')[0]}! 👋
          </h2>
          <p style={{ fontSize: '14px', color: '#64748B', margin: '4px 0 0 0' }}>
            Your current academic workspace velocity is looking healthy. Let's execute today's target goals.
          </p>
        </div>

        {/* 4. PERFORMANCE & PRODUCTIVITY GRID METER */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '16px',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {metrics.map((card, idx) => (
            <div key={idx} style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '10px', border: '1px solid #E2E8F0', boxShadow: '0 1px 2px rgba(0,0,0,0.01)', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748B' }}>{card.title}</span>
                <div style={{ width: '30px', height: '30px', borderRadius: '6px', backgroundColor: `${card.color}12`, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '15px' }}>
                  {card.icon}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '24px', fontWeight: '700', color: '#0B133A' }}>{card.score}</span>
                <span style={{ fontSize: '11px', fontWeight: '500', color: idx === 2 ? '#64748B' : '#10B981' }}>{card.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* =========================================================================
            5, 6 & 7. BALANCED FULL-WIDTH DASHBOARD CORE MODULE CARDS
            ========================================================================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', boxSizing: 'border-box' }}>
          
          {/* UPCOMING DEADLINES CONTAINER */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', border: '1px solid #E2E8F0', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0B133A', margin: 0 }}>⚠️ Upcoming Module Deadlines</h3>
              <span style={{ fontSize: '12px', color: '#3B82F6', fontWeight: '600', cursor: 'pointer' }}>Manage Mission Control</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderLeft: '4px solid #EF4444', backgroundColor: '#FEF2F2', borderRadius: '0 6px 6px 0' }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B' }}>Database Schema Architecture Submission</div>
                <div style={{ fontSize: '12px', color: '#EF4444', fontWeight: '600', backgroundColor: '#FEE2E2', padding: '3px 8px', borderRadius: '4px' }}>Due Tonight, 11:59 PM</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderLeft: '4px solid #F59E0B', backgroundColor: '#FFFBEB', borderRadius: '0 6px 6px 0' }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B' }}>Deep Learning Base Paper Literature Review</div>
                <div style={{ fontSize: '12px', color: '#B45309', fontWeight: '600', backgroundColor: '#FEF3C7', padding: '3px 8px', borderRadius: '4px' }}>Due in 2 Days</div>
              </div>
            </div>
          </div>

          {/* ACTIVE STUDY PATH TRACKS */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', border: '1px solid #E2E8F0', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0B133A', margin: 0 }}>🧭 Active StudyPaths</h3>
              <span style={{ fontSize: '12px', color: '#3B82F6', fontWeight: '600', cursor: 'pointer' }}>Configure Tracks</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', color: '#1E293B', marginBottom: '6px' }}>
                  <span>Data Structures Mastery Sprint</span>
                  <span style={{ color: '#3B82F6' }}>65% Complete</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '65%', height: '100%', backgroundColor: '#3B82F6', borderRadius: '3px' }}></div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', color: '#1E293B', marginBottom: '6px' }}>
                  <span>MySQL Core Query Optimization</span>
                  <span style={{ color: '#10B981' }}>40% Complete</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '40%', height: '100%', backgroundColor: '#10B981', borderRadius: '3px' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* RECENT ACTIVITIES & PREDICTIVE ANALYTICS ENGINE */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', border: '1px solid #E2E8F0', width: '100%', boxSizing: 'border-box' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0B133A', margin: '0 0 14px 0' }}>💡 Activity Feed & Smart Analytics Insights</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Feed Item 1 */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: '15px' }}>📝</span>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: '500', color: '#1E293B' }}>Attempted RapidPrep Mini Practice Quiz: <b style={{ color: '#10B981' }}>9/10 Score</b></span>
                  <span style={{ fontSize: '11px', color: '#94A3B8' }}>30 mins ago</span>
                </div>
              </div>

              {/* Feed Item 2 */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', paddingBottom: '2px' }}>
                <span style={{ fontSize: '15px' }}>📂</span>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: '500', color: '#1E293B' }}>Downloaded Reference Notes from Knowledge Vault: <b>"Indexing_BTrees.pdf"</b></span>
                  <span style={{ fontSize: '11px', color: '#94A3B8' }}>Yesterday</span>
                </div>
              </div>

              {/* Future AI Intelligence Block */}
              <div style={{ 
                marginTop: '4px', 
                padding: '14px', 
                borderRadius: '6px', 
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)', 
                border: '1px solid rgba(99, 102, 241, 0.12)' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', color: '#4F46E5', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                  ✨ Planned AI Predictive Insight Engine (Next Phase)
                </div>
                <p style={{ fontSize: '12px', color: '#475569', margin: 0, lineHeight: '1.5' }}>
                  Based on your performance trends across uploaded quizzes, you have strong retention in SQL Data Definition Language (DDL) constraints but exhibit a 12% drop pattern when solving complex Joins. 
                  <span style={{ fontWeight: '600', color: '#0F172A' }}> Recommended Next Action:</span> Spend 15 minutes reviewing the interactive Left/Right Outer Join maps in Knowledge Vault.
                </p>
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}