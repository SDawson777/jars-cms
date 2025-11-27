import React from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'

function App(){
  return (
    <BrowserRouter>
      <div style={{display:'flex',minHeight:'100vh'}}>
        <aside style={{width:220,padding:16,background:'#1e293b',color:'#fff'}}>
          <h1 style={{fontSize:18,marginBottom:16}}>Nimbus Admin</h1>
          <nav style={{display:'grid',gap:8}}>
            <Link to="/" style={{color:'#cbd5e1',textDecoration:'none'}}>Dashboard</Link>
            <Link to="/content" style={{color:'#cbd5e1',textDecoration:'none'}}>Content</Link>
            <Link to="/settings" style={{color:'#cbd5e1',textDecoration:'none'}}>Settings</Link>
          </nav>
        </aside>
        <main style={{flex:1,padding:24}}>
          <Routes>
            <Route path="/" element={<div><h1>Dashboard</h1><p>Nimbus Admin Suite</p></div>} />
            <Route path="/content" element={<div><h1>Content</h1></div>} />
            <Route path="/settings" element={<div><h1>Settings</h1></div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
