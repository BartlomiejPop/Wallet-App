import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loader}>
      <RotatingLines
        size={120} 
        color="#ff6347" 
        loading 
        ariaLabel="infinity-loading" 
      />
    </div>
  );
};

export default Loader;