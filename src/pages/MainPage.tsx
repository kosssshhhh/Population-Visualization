import Inflation from '../component/dashboardContainer/Inflation.container';
import Married from '../component/dashboardContainer/Married.container';
import Population from '../component/dashboardContainer/Population.container';
import Aging from '../component/dashboardContainer/Aging.container';
import Cartogram from '../component/dashboardContainer/Cartogram.container';

const MainPage = () => {
  return (
    <section style={{ backgroundColor: 'black' }}>
      <p>This is a Main Page</p>
      <Population />
      <Married />
      <Inflation />
      <Aging />
      <Cartogram />
    </section>
  );
};

export default MainPage;
