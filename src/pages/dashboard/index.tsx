import React from 'react';
import { useTranslation } from 'react-i18next';
import TotalBalance from './balance';
export const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="main-page-dashboard">
      <TotalBalance />
    </div>
  );
};

export default DashboardPage;
