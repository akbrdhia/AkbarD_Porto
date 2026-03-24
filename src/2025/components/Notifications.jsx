import React from "react";
import { usePortfolio } from "../context/PortfolioContext";

const Notifications = () => {
  const { notifications } = usePortfolio();

  return (
    <div className="notification-container">
      {notifications.map((notif) => (
        <div key={notif.id} className={`notification ${notif.type}`}>
          {notif.message}
        </div>
      ))}
    </div>
  );
};

export default Notifications;