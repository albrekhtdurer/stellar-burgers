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
import { getIngredients } from '../../services/slices/burgersSlice';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';

const App = () => {
  let location = useLocation();
  let state = location.state as { background?: Location };
  let navigate = useNavigate();
  const onModalClose = () => navigate(-1);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('getIngredients');
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={state?.background || location}>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        //TODO: protect
        <Route path='/login' element={<Login />} />
        //TODO: protect
        <Route path='/register' element={<Register />} />
        // TODO: protect
        <Route path='/forgot-password' element={<ForgotPassword />} />
        // TODO: protect
        <Route path='/reset-password' element={<ResetPassword />} />
        // TODO: protect
        <Route path='/profile' element={<Profile />} />
        // TODO: protect
        <Route path='/profile/orders' element={<ProfileOrders />} />
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
        // TODO: title + protect
        <Route path='/profile/orders/:number' element={<OrderInfo />} />
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
          // TODO: title + protect
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='Order Info' onClose={onModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
