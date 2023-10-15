import { SyncLoader } from 'react-spinners';

type Props = {
  isLoading: boolean;
  color?: string;
  size?: number;
  margin?: number;
};


const LoadingSpinner = ({ isLoading, color='#36d7b7', size=10, margin=2 }: Props) => {
  return <SyncLoader loading={isLoading} color={color} size={size} margin={margin} />;
};
export default LoadingSpinner;
