import React from 'react';
import Layout from './components/layout/Layout';
import { Routes, Route } from 'react-router-dom';
import Elements from './pages/Elements';
import { AppStateProvider } from './components/AppState';
import ElementsLinks from './pages/ElementsLinks';

function App() {
  return (
    <AppStateProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Elements />} />
          <Route path="/elements" element={<Elements />} />
          <Route path="/element-links" element={<ElementsLinks />} />
        </Routes>
      </Layout>
    </AppStateProvider>
  );
}

export default App;
