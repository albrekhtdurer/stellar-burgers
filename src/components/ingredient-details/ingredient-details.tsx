import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ingredientsSelector } from '../../services/ingredients/slice';

export const IngredientDetails: FC = () => {
  const params = useParams();
  const id = params.id;
  const ingredients = useSelector(ingredientsSelector);
  const ingredientData = ingredients?.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
