import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* Yahan par aap Header ya Footer jaise common components bhi daal sakte hain */}
      <main>
        <Outlet /> {/* Yeh line aap ke routes ke mutabiq page render karegi */}
      </main>
    </div>
  );
}

export default App;
