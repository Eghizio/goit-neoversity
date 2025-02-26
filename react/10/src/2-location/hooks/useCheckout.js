import { useNavigate } from "react-router-dom";

export const useCheckout = () => {
  const navigate = useNavigate();

  const checkout = (productId) => {
    const searchParam = new URLSearchParams({ productId }).toString();
    navigate(`/checkout?${searchParam}`);
  };

  return checkout;
};
