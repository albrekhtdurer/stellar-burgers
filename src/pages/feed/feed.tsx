import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { ordersSelector } from '../../services/feeds/slice';
import { useSelector, useDispatch } from '../../services/store';
import { getFeeds } from '../../services/feeds/actions';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(ordersSelector);

  const handleRefresh = () => {
    console.log('refresh');
    dispatch(getFeeds());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleRefresh} />;
};
