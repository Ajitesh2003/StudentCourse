import React from "react";
import { Drawer } from "vaul";
// import "./App.css";
//  Ensure this is imported to apply the styles

const DrawerComp = ({ children }) => {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button className="drawer-trigger">Dashboard</button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="drawer-overlay" />
        <Drawer.Content className="drawer-content">
          <div className="drawer-header">
            <div className="drawer-title">Student Dashboard</div>
          </div>
          <div className="drawer-body">
            {children} {/* Render child components here */}
          </div>
          <div className="drawer-footer">{/* Additional content */}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default DrawerComp;
