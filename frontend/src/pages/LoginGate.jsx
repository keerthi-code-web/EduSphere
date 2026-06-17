import React, { useState } from 'react';

export default function LoginGate({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student Portal');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      // Normalize role keys for system layout routing
      const normalizedRole = role === 'Institutional Administrator' ? 'admin' : 'student';
      onLogin(normalizedRole);
    } else {
      alert('Please enter your academic credentials.');
    }
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, sans-serif', overflow: 'hidden', backgroundColor: '#F8FAFC' }}>
      
      {/* =========================================================================
          LEFT SECTION: Exact Space Blue Background (#0B133A) & Master Layout 
          ========================================================================= */}
      <div style={{ width: '45%', backgroundColor: '#0B133A', color: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 50px', position: 'relative', boxSizing: 'border-box' }}>
        
        {/* Orbital Background Grid Accents from UI Layout */}
        <div style={{ position: 'absolute', top: '5%', right: '8%', width: '150px', height: '150px', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '4%', left: '6%', width: '220px', height: '220px', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>

        {/* Brand Container */}
        <div style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          
          {/* Logo & Platform Name Heading */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', justifyContent: 'center', marginBottom: '20px' }}>
            {/* High-Fidelity Rocket Icon Blasting Off */}
            <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 16.5c-1.5 1.26-2.5 3.19-2.5 5.5s3 1.5 5.5-2.5" />
              <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4 2.5 5.5L17 5c-1.5-1.5-3-2.5-5.5-2.5z" />
              <path d="M19 5c1.5 1.5 2.5 3.5 2.5 5.5s-4.5 10-10 10c-2.5 0-4-1-5.5-2.5L19 5z" />
              <circle cx="12" cy="9" r="2" fill="#FFFFFF" />
            </svg>
            <h1 style={{ fontSize: '44px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px', color: '#FFFFFF' }}>EduSphere</h1>
          </div>

          {/* Precision Horizontal Rule Separator */}
          <div style={{ width: '100%', height: '1.5px', backgroundColor: 'rgba(255, 255, 255, 0.2)', marginBottom: '24px' }}></div>

          {/* Subheading Title */}
          <p style={{ fontSize: '18px', color: '#FFFFFF', fontWeight: '500', margin: '0 0 40px 0', letterSpacing: '0.2px' }}>
            Personalized Academic Growth Hub
          </p>

          {/* Academic Tree & Student Illustration Canvas Wrapper */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '290px', height: '290px', position: 'relative' }}>
              
              {/* Green Tree Leaves Backdrop Clusters */}
              <div style={{ position: 'absolute', bottom: '75px', left: '50px', width: '190px', height: '190px', backgroundColor: '#22C55E', opacity: '0.85', borderRadius: '50%' }}></div>
              <div style={{ position: 'absolute', bottom: '165px', left: '40px', width: '80px', height: '80px', backgroundColor: '#16A34A', borderRadius: '50%' }}></div>
              <div style={{ position: 'absolute', bottom: '180px', right: '45px', width: '85px', height: '85px', backgroundColor: '#15803D', borderRadius: '50%' }}></div>
              
              {/* Trunk */}
              <div style={{ position: 'absolute', bottom: '25px', left: '130px', width: '30px', height: '70px', backgroundColor: '#78350F', borderRadius: '2px' }}></div>
              
              {/* Soft Grass Base Plot */}
              <div style={{ position: 'absolute', bottom: '15px', left: '25px', width: '240px', height: '18px', backgroundColor: '#4ADE80', borderRadius: '50%' }}></div>

              {/* Student Figure Interface Layer */}
              <div style={{ position: 'absolute', bottom: '22px', left: '90px', width: '110px', height: '110px', zIndex: 3 }}>
                <div style={{ width: '24px', height: '24px', backgroundColor: '#FED7AA', borderRadius: '50%', margin: '0 auto', position: 'relative', top: '10px' }}>
                  <div style={{ width: '26px', height: '14px', backgroundColor: '#475569', borderRadius: '10px 10px 0 0', position: 'absolute', top: '-4px', left: '-1px' }}></div>
                </div>
                <div style={{ width: '38px', height: '44px', backgroundColor: '#F87171', borderRadius: '12px 12px 4px 4px', margin: '6px auto 0 auto' }}></div>
                <div style={{ width: '80px', height: '22px', backgroundColor: '#1D4ED8', borderRadius: '10px', position: 'absolute', bottom: '5px', left: '15px' }}></div>
                {/* Working Notebook Computer Frame */}
                <div style={{ width: '38px', height: '22px', backgroundColor: '#CBD5E1', borderRadius: '2px', position: 'absolute', bottom: '24px', left: '52px', transform: 'rotate(-8deg)' }}>
                  <div style={{ width: '32px', height: '16px', backgroundColor: '#38BDF8', margin: '2px auto 0 auto', opacity: 0.8 }}></div>
                </div>
              </div>

              {/* Floating Performance Indicator Badges */}
              <div style={{ position: 'absolute', bottom: '130px', left: '10px', backgroundColor: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>📖</div>
              <div style={{ position: 'absolute', bottom: '195px', left: '70px', backgroundColor: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>💡</div>
              <div style={{ position: 'absolute', bottom: '170px', right: '30px', backgroundColor: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>📊</div>
              <div style={{ position: 'absolute', bottom: '105px', right: '2px', backgroundColor: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>⏱️</div>
              <div style={{ position: 'absolute', bottom: '65px', left: '20px', backgroundColor: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>⚙️</div>

            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          RIGHT SECTION: Form Area Matching the Design Structure
          ========================================================================= */}
      <div style={{ width: '55%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px', boxSizing: 'border-box' }}>
        
        {/* Main Central Card Panel */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)', width: '100%', maxWidth: '440px', border: '1px solid #E2E8F0' }}>
          
          <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#000000', margin: '0 0 8px 0', letterSpacing: '-0.3px' }}>
            Access your EduSphere Workspace
          </h2>
          <p style={{ fontSize: '14px', color: '#64748B', margin: '0 0 28px 0' }}>
            Welcome back! Enter your academic credentials.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Profile Dropdown Gateway */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#000000', marginBottom: '8px' }}>
                Select Profile Role
              </label>
              <div style={{ position: 'relative' }}>
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #6366F1', backgroundColor: '#FFFFFF', color: '#000000', fontSize: '15px', outline: 'none', cursor: 'pointer', appearance: 'none' }}
                >
                  <option value="Student Portal">Student Portal</option>
                  <option value="Institutional Administrator">Institutional Administrator</option>
                </select>
                <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6366F1', fontSize: '11px' }}>▼</div>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#000000', marginBottom: '8px' }}>
                Institutional Email
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourname@college.edu" 
                style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#000000', fontSize: '15px', boxSizing: 'border-box', outline: 'none' }}
                required 
              />
            </div>

            {/* Password Field with Show/Hide Control */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#000000', marginBottom: '8px' }}>
                Password
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  style={{ width: '100%', padding: '12px 42px 12px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#000000', fontSize: '15px', boxSizing: 'border-box', outline: 'none' }}
                  required 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: 0 }}
                >
                  {showPassword ? (
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88L3 3m18 18l-3.876-3.876m0 0a10.01 10.01 0 002.333-5.124C20.183 7.943 16.393 5 11.916 5c-1.401 0-2.73.284-3.94.8l-.485-.486"/></svg>
                  ) : (
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Action Submit Trigger Button using Vibrant Digital Blue (#3B82F6) */}
            <button 
              type="submit" 
              style={{ width: '100%', padding: '14px', backgroundColor: '#3B82F6', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '6px', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)' }}
            >
              Authenticate & Enter Hub
            </button>
          </form>

          {/* Form Actions Footer Navigation Link Items */}
          <div style={{ textAlign: 'center', marginTop: '26px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '14px', color: '#3B82F6', cursor: 'pointer', fontWeight: '500' }}>
              Forgot Password?
            </span>
            <span style={{ fontSize: '14px', color: '#64748B' }}>
              Don't have an account? <b style={{ color: '#000000', cursor: 'pointer', textDecoration: 'underline' }}>Sign Up</b>
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}