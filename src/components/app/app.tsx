import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { getIngredients } from '../../services/ingredients/actions';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { checkUserAuthentication } from '../../services/user/actions';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getFeeds } from '../../services/feeds/actions';
import { useSelector } from 'react-redux';
import { isIngredientsLoadingSelector } from '../../services/ingredients/slice';
import { isFeedsLoadingSelector } from '../../services/feeds/slice';
import { isAuthCheckedSelector } from '../../services/user/slice';
import { Preloader } from '@ui';

const App = () => {
  const location = useLocation();
  const state = location.state as { background?: Location };
  const navigate = useNavigate();
  const onModalClose = () => navigate(-1);
  const dispatch = useDispatch();
  const isIngredientsLoading = useSelector(isIngredientsLoadingSelector);
  const isFeedsLoading = useSelector(isFeedsLoadingSelector);
  const isUserAuthChecked = useSelector(isAuthCheckedSelector);

  useEffect(() => {
    dispatch(checkUserAuthentication());
  }, []);

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  const isLoading =
    isIngredientsLoading || isFeedsLoading || !isUserAuthChecked;

  return (
    <div className={styles.app}>
      <AppHeader />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <Routes location={state?.background || location}>
            <Route path='*' element={<NotFound404 />} />
            <Route path='/' element={<ConstructorPage />} />
            <Route path='/feed' element={<Feed />} />
            <Route
              path='/login'
              element={<ProtectedRoute forUnAuth component={<Login />} />}
            />
            <Route
              path='/register'
              element={<ProtectedRoute forUnAuth component={<Register />} />}
            />
            <Route
              path='/forgot-password'
              element={
                <ProtectedRoute forUnAuth component={<ForgotPassword />} />
              }
            />
            <Route
              path='/reset-password'
              element={
                <ProtectedRoute forUnAuth component={<ResetPassword />} />
              }
            />
            <Route
              path='/profile'
              element={<ProtectedRoute component={<Profile />} />}
            />
            <Route
              path='/profile/orders'
              element={<ProtectedRoute component={<ProfileOrders />} />}
            />
            <Route path='/feed/:number' element={<OrderInfo />} />
            <Route
              path='/ingredients/:id'
              element={
                <div className={styles.detailPageWrap}>
                  <h1
                    className={`text text_type_main-large ${styles.detailHeader}`}
                  >
                    Детали ингредиента
                  </h1>
                  <IngredientDetails />
                </div>
              }
            />
            // TODO: title
            <Route
              path='/profile/orders/:number'
              element={<ProtectedRoute component={<OrderInfo />} />}
            />
          </Routes>

          {state?.background && (
            <Routes>
              <Route
                path='/feed/:number'
                element={
                  <Modal title='Детали заказа' onClose={onModalClose}>
                    <OrderInfo />
                  </Modal>
                }
              />
              <Route
                path='/ingredients/:id'
                element={
                  <Modal title='Детали ингредиента' onClose={onModalClose}>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path='/profile/orders/:number'
                element={
                  <ProtectedRoute
                    component={
                      <Modal title='Детали заказа' onClose={onModalClose}>
                        <OrderInfo />
                      </Modal>
                    }
                  />
                }
              />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};

export default App;
