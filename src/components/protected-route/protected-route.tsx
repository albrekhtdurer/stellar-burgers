import { Preloader } from '@ui';
import {
  isAuthCheckedSelector,
  userSelector
} from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  forUnAuth?: boolean;
  component: React.JSX.Element;
};

export const ProtectedRoute = ({
  forUnAuth = false,
  component
}: ProtectedRouteProps): React.JSX.Element => {
  const user = useSelector(userSelector);
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!forUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (forUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  return component;
};
