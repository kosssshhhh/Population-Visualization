import Inflation from '../component/dashboardContainer/Inflation.container';
import Married from '../component/dashboardContainer/Married.container';
import Population from '../component/dashboardContainer/Population.container';
import Aging from '../component/dashboardContainer/Aging.container';

const MainPage = () => {
  return (
    <section>
      <p>This is a Main Page</p>
      <Population />
      <Married />
      <Inflation />
      <Aging />
    </section>
  );
};

export default MainPage;
