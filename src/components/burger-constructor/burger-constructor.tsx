import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  constructorItemsSelector,
  setConstructorItems
} from '../../services/slices/burgersSlice';
import { useDispatch, useSelector } from '../../services/store';
import {
  isAuthCheckedSelector,
  orderModalDataSelector,
  orderRequestSelector,
  sendUserOrder,
  setOrderModalData,
  userSelector
} from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorItems = useSelector(constructorItemsSelector);

  const orderRequest = useSelector(orderRequestSelector);

  const orderModalData = useSelector(orderModalDataSelector);

  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const user = useSelector(userSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuthChecked || (isAuthChecked && !user)) {
      navigate('/login');
      return;
    }
    const orderData = constructorItems.ingredients.map((item) => item._id);
    orderData.push(constructorItems.bun._id);
    dispatch(sendUserOrder(orderData));
  };

  const closeOrderModal = () => {
    dispatch(setOrderModalData(null));
    dispatch(setConstructorItems({ bun: null, ingredients: [] }));
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
