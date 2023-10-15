import LoadingSpinner from '../common/loading/LoadingSpinner.component';

type Props<T> = {
  data: T;
  isLoading: boolean;
};
const DashboardContainer = <T,>({ data, isLoading }: Props<T>) => {
  if (isLoading) return <LoadingSpinner isLoading={isLoading} />; // skeleton UI
  if (data) return <div>data is in UI</div>;
  else return <div>Error</div>;
};

export default DashboardContainer;
