import {ErrorBoundary} from 'react-error-boundary';
import ErrorView from './ErrorView';
import {useNavigate} from 'react-router-dom';
import {navigationPaths} from '../utils/navigationConstants';

const CustomErrorBoundary = ({children}) => {
    const navigate = useNavigate();

    const resetErrorState = () => {
        navigate(navigationPaths.home);
      };

    return (
        <ErrorBoundary
            FallbackComponent={ErrorView}
            onReset={resetErrorState}
        >
            {children}
        </ErrorBoundary>
    );
};

export default CustomErrorBoundary;