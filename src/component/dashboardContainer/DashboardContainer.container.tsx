import React from 'react';
import LoadingSpinner from '../common/loading/LoadingSpinner.component';

type Props = {
  isLoading: boolean;
  children: React.ReactNode;
  isError: boolean;
};
const DashboardContainer = ({ isLoading, children, isError }: Props) => {
  if (isLoading) return <LoadingSpinner isLoading={isLoading} />; // skeleton UI
  if (isError) return <>Error Page</>;
  return <>{children}</>;
};

export default DashboardContainer;
