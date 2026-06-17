import React, { useState } from 'react';

// Import our 8 custom page components
import LoginGate from './pages/LoginGate';
import CommandCenter from './pages/CommandCenter';
import MissionControl from './pages/MissionControl';
import KnowledgeVault from './pages/KnowledgeVault';
import StudyPath from './pages/StudyPath';
import RapidPrep from './pages/RapidPrep';
import ProgressIq from './pages/ProgressIq';
import AdminConsole from './pages/AdminConsole';

export default function App() {
  const [currentPage, setCurrentPage] = useState('login'); 
  const [userRole, setUserRole] = useState('student'); // 'student' or 'admin'

  const handleLoginState = (selectedRole) => {
    setUserRole(selectedRole);
    setCurrentPage(selectedRole === 'admin' ? 'adminConsole' : 'commandCenter');
  };

  const renderMainContent = () => {
    switch (currentPage) {
      case 'commandCenter': return <CommandCenter />;
      case 'missionControl': return <MissionControl />;
      case 'knowledgeVault': return <KnowledgeVault />;
      case 'studyPath': return <StudyPath />;
      case 'rapidPrep': return <RapidPrep />;
      case 'progressIq': return <ProgressIq />;
      case 'adminConsole': return <AdminConsole />;
      default: return <CommandCenter />;
    }
  };

  if (currentPage === 'login') {
    return <LoginGate onLogin={handleLoginState} />;
  }

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif', backgroundColor: '#f9fafb' }}>
      {/* Side Navigation Bar */}
      <div style={{ width: '270px', backgroundColor: '#1e1b4b', color: '#ffffff', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ margin: '0 0 4px 0', fontSize: '22px' }}>🌐 EduSphere</h3>
        <span style={{ fontSize: '11px', color: '#a5b4fc', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '28px' }}>
          {userRole === 'admin' ? 'Admin Portal' : 'Student Hub'}
        </span>

        {/* Conditional Sidebar Buttons */}
        {userRole === 'student' ? (
          <>
            <button onClick={() => setCurrentPage('commandCenter')} style={{ textAlign: 'left', padding: '12px', backgroundColor: currentPage === 'commandCenter' ? '#312e81' : 'transparent', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', marginBottom: '6px' }}>📊 Screen 2: Command Center</button>
            <button onClick={() => setCurrentPage('missionControl')} style={{ textAlign: 'left', padding: '12px', backgroundColor: currentPage === 'missionControl' ? '#312e81' : 'transparent', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', marginBottom: '6px' }}>🎯 Screen 3: Mission Control</button>
            <button onClick={() => setCurrentPage('knowledgeVault')} style={{ textAlign: 'left', padding: '12px', backgroundColor: currentPage === 'knowledgeVault' ? '#312e81' : 'transparent', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', marginBottom: '6px' }}>📂 Screen 4: Knowledge Vault</button>
            <button onClick={() => setCurrentPage('studyPath')} style={{ textAlign: 'left', padding: '12px', backgroundColor: currentPage === 'studyPath' ? '#312e81' : 'transparent', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', marginBottom: '6px' }}>📅 Screen 5: StudyPath</button>
            <button onClick={() => setCurrentPage('rapidPrep')} style={{ textAlign: 'left', padding: '12px', backgroundColor: currentPage === 'rapidPrep' ? '#312e81' : 'transparent', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', marginBottom: '6px' }}>📝 Screen 6: RapidPrep</button>
            <button onClick={() => setCurrentPage('progressIq')} style={{ textAlign: 'left', padding: '12px', backgroundColor: currentPage === 'progressIq' ? '#312e81' : 'transparent', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', marginBottom: '6px' }}>🧠 Screen 7: ProgressIQ</button>
          </>
        ) : (
          <button onClick={() => setCurrentPage('adminConsole')} style={{ textAlign: 'left', padding: '12px', backgroundColor: '#312e81', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', marginBottom: '6px' }}>🏢 Screen 8: Admin Dashboard</button>
        )}

        <div style={{ marginTop: 'auto', borderTop: '1px solid #312e81', paddingTop: '16px' }}>
          <p style={{ margin: '0', fontSize: '13px', color: '#cbd5e1' }}>User: <b>{userRole === 'admin' ? 'System Administrator' : 'Keerthi B'}</b></p>
          <button onClick={() => setCurrentPage('login')} style={{ marginTop: '12px', background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', padding: '0', fontWeight: '500' }}>Log Out</button>
        </div>
      </div>

      {/* Main Panel Content Window */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        {renderMainContent()}
      </div>
    </div>
  );
}