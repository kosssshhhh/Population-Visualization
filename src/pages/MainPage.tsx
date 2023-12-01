import { InflationProvider } from '../context/InflationContext';
import ScrollProgress from '../component/common/ScrollProgress/ScrollProgress';
import Cartogram from '../component/dashboardContainer/Cartogram';
import Inflation from '../component/dashboardContainer/Inflation.container';
import Married from '../component/dashboardContainer/Married.container';
import Population from '../component/dashboardContainer/Population.container';

import styles from './MainPage.module.css';
import HeaderComponent from '../component/common/header/Header.component';
import Aging from '../component/dashboardContainer/Aging.container';
import { pageStyle } from '../@constants/style/style';
import NewsHeadline from '../component/common/comments/NewsHeadline';
import AgingIndex from '../component/dashboardContainer/AgingIndex.container';

const MainPage = () => {
  return (
    <main
      className={styles['main-container']}
      style={{ height: pageStyle.height }}>
      <div className={styles['progress-container']}>
        <ScrollProgress />
      </div>
      <div className={styles['dashboard-container']}>
        <HeaderComponent />
        <NewsHeadline />
        <Population />
        <Married />
        <InflationProvider>
          <Inflation />
        </InflationProvider>
        <Aging />
        <Cartogram />
        <AgingIndex />
      </div>
    </main>
  );
};

export default MainPage;
