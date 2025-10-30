import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { ingredientsSelector } from '../../services/ingredients/slice';
import {
  ordersSelector,
  selectedOrderSelector,
  setSelectedOrder
} from '../../services/feeds/slice';
import { useParams } from 'react-router-dom';
import { userOrdersSelector } from '../../services/order/slice';
import { getOrder } from '../../services/feeds/actions';

export const OrderInfo: FC = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const orderNumber = params.number;
  let orderFromFeed: TOrder | null = null;
  const orders = /feed/.test(location.pathname)
    ? useSelector(ordersSelector)
    : useSelector(userOrdersSelector);
  if (orderNumber) {
    orderFromFeed =
      orders.find((order) => order.number.toString() === orderNumber) || null;
  }

  useEffect(() => {
    if (orderFromFeed) {
      dispatch(setSelectedOrder(orderFromFeed));
    } else if (orderNumber) {
      dispatch(getOrder(Number(orderNumber)));
    }
  }, []);

  const orderData = useSelector(selectedOrderSelector);

  const ingredients = useSelector(ingredientsSelector) || [];

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
