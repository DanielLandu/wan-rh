import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/sidebar';
import Header from '@/components/layout/header';
import { useState } from 'react';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen overflow-hidden">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-muted/20 p-6">
            <div className="page-container">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}