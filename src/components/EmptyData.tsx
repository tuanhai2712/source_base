import React from 'react';

import { DocumentEmptyIcon } from '@/assets';
import { useTranslation } from 'react-i18next';
export const EmptyData = () => {
  const { t } = useTranslation();
  return (
    <div className="titan-box-empty">
      <DocumentEmptyIcon />
      <p className="description">{t('There are no records to display')}</p>
    </div>
  );
};
