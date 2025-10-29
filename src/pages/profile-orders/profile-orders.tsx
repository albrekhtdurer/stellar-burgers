import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  isOrdersLoadingSelector,
  userOrdersSelector
} from '../../services/order/slice';
import { getUserOrders } from '../../services/order/actions';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(isOrdersLoadingSelector);

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  const orders: TOrder[] = useSelector(userOrdersSelector) || [];

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
