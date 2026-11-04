import React, { useState, useEffect } from 'react';
import { PosView } from './components/PosView';
import { MenuView } from './components/MenuView';

export const App: React.FC = () => {
  // Check URL query param or hash for initial view
  const [activeView, setActiveView] = useState<'pos' | 'menu'>(() => {
    if (typeof window !== 'undefined') {
      const search = new URLSearchParams(window.location.search);
      if (search.get('view') === 'menu') return 'menu';
      if (window.location.pathname.startsWith('/menu')) return 'menu';
    }
    return 'pos';
  });

  // Keep URL updated smoothly
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (activeView === 'menu') {
      params.set('view', 'menu');
    } else {
      params.delete('view');
    }
    const newRelativePathQuery = window.location.pathname + (params.toString() ? `?${params.toString()}` : '');
    window.history.replaceState(null, '', newRelativePathQuery);
  }, [activeView]);

  return (
    <div className="w-full min-h-screen">
      {activeView === 'pos' ? (
        <PosView onSwitchToMenu={() => setActiveView('menu')} />
      ) : (
        <MenuView onSwitchToPos={() => setActiveView('pos')} />
      )}
    </div>
  );
};

export default App;
