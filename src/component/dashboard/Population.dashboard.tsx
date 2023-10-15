import useFetchCSVData from '../../hooks/useFetchCSVData';
import apis from '../../keys/api';
import DashboardContainer from './DashboardContainer.component';

const Population = () => {
  const {
    isLoading,
    isError,
    csvData: population,
  } = useFetchCSVData(apis.population);
  return <DashboardContainer data={population} isLoading={isLoading} />;
};

export default Population;
