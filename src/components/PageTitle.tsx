import React from 'react';

type IProps = {
  pageTitle: string;
  children?: React.ReactElement;
};

const PageTitle: React.FC<IProps> = ({ pageTitle, children }) => {
  return (
    <div className="page-title-index">
      <span className="title">{pageTitle}</span>
      {children}
    </div>
  );
};

export default PageTitle;
