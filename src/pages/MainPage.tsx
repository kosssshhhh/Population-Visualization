import ScrollProgress from '../component/common/ScrollProgress/ScrollProgress';
import Cartogram from '../component/dashboardContainer/Cartogram';
import Inflation from '../component/dashboardContainer/Inflation.container';
import Married from '../component/dashboardContainer/Married.container';
import Population from '../component/dashboardContainer/Population.container';
import { InflationProvider } from '../context/InflationContext';

const MainPage = () => {
  return (
    <section>
      <div>
        <ScrollProgress />
      </div>
      <div>
        <Population />
        <Married />
        <InflationProvider>
          <Inflation />
        </InflationProvider>
        <Cartogram />
      </div>
    </section>
  );
};

export default MainPage;
