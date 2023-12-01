import { InflationProvider } from '../context/InflationContext';
import ScrollProgress from '../component/common/ScrollProgress/ScrollProgress';
import Cartogram from '../component/dashboardContainer/Cartogram';
import Inflation from '../component/dashboardContainer/Inflation.container';
import Married from '../component/dashboardContainer/Married.container';
import Population from '../component/dashboardContainer/Population.container';

import styles from './MainPage.module.css';
import HeaderComponent from '../component/common/header/Header.component';
import Aging from '../component/dashboardContainer/Aging.container';

const MainPage = () => {
  return (
    <main className={styles['main-container']}>
      <div className={styles['progress-container']}>
        <ScrollProgress />
      </div>
      <div className={styles['dashboard-container']}>
        <HeaderComponent />
        <Population />
        <Married />
        <InflationProvider>
          <Inflation />
        </InflationProvider>
        <Aging />
        <Cartogram />
      </div>
    </main>
  );
};

export default MainPage;
