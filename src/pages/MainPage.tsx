import Cartogram from '../component/dashboardContainer/Cartogram';
import Inflation from '../component/dashboardContainer/Inflation.container';
import Married from '../component/dashboardContainer/Married.container';
import Population from '../component/dashboardContainer/Population.container';

const MainPage = () => {
  return (
    <section>
      <p>This is a Main Page</p>
      <Population />
      <Married />
      <Inflation />
      <Cartogram />
    </section>
  );
};

export default MainPage;
