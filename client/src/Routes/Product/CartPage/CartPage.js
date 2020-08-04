import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../../_actions/user_action";
function CartPage(props) {
  console.log(989, props);
  const dispatch = useDispatch();
  useEffect(() => {
    let cartItems = [];

    //redux User state안에 Cart 안에 상품이 들어 있는지 확인
    if (props.movies.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });

        dispatch(getCartItems(cartItems, props.user.userData.cart));
      }
    }
  }, [props.user.userData]);
  return <div>asd</div>;
}

export default CartPage;
