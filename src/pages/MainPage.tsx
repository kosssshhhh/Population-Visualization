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
<<<<<<< HEAD
import AgingIndex from '../component/dashboardContainer/AgingIndex.container';
import PopulationPyramid from '../component/dashboardContainer/PopulationPyramid.container';
=======
import { initialNews } from '../@constants/news/newsHeadline';
import Keywords from '../component/common/comments/Keywords';
>>>>>>> layout

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
<<<<<<< HEAD
        <NewsHeadline />
=======
        <Keywords />
        <NewsHeadline news={initialNews} />
>>>>>>> layout
        <Population />
        <Married />
        <InflationProvider>
          <Inflation />
        </InflationProvider>
        <Aging />
        <Cartogram />
        <AgingIndex />
        <PopulationPyramid />
      </div>
    </main>
  );
};

export default MainPage;
