import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { getFeeds, ordersSelector } from '../../services/slices/ordersSlice';
import { useSelector, useDispatch } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(ordersSelector);

  const handleRefresh = () => {
    console.log('refresh');
    dispatch(getFeeds());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleRefresh} />;
};
