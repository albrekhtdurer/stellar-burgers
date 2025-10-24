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
import { Routes, Route } from 'react-router-dom';

import { AppHeader } from '@components';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
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
    </Routes>
  </div>
);

export default App;
