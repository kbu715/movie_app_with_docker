import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getMovieItems,
  removeMovieItem,
  getCartItems,
  removeCartItem,
  onSuccessBuy,
} from "../../_actions/user_action";
import UserMovie from "./Sections/UserMovie";
import { Empty, Result } from "antd";
import CartPage from "../Product/CartPage/CartPage";
import Paypal from "../../utils/Paypal";
function MyMovie(props) {
  console.log("movie", props);
  const dispatch = useDispatch();
  const [ShowTotalMovie, setShowTotalMovie] = useState(true);
  const [ShowTotalProduct, setShowTotalProduct] = useState(true);
  const [Total, setTotal] = useState(0);
  const [ShowSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    let movieObjIds = [];
    let cartItems = [];
    //리덕스 User state안에 movie안에 결재내역이 있는지 확인
    if (props.user.userData && props.user.userData.movie) {
      if (props.user.userData.movie.length > 0) {
        props.user.userData.movie.forEach((item) => {
          movieObjIds.push(item._id);
        });

        dispatch(getMovieItems(movieObjIds, props.user.userData.movie));
      }
    }

    //redux User state안에 Cart 안에 상품이 들어 있는지 확인
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });

        dispatch(getCartItems(cartItems, props.user.userData.cart)).then(
          (response) => {
            calculateTotal(response.payload);
          }
        );
      }
    }
  }, [props.user.userData]);

  let calculateTotal = (cartDetail) => {
    let total = 0;
    cartDetail.map((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    setTotal(total);
  };

  const removeFromMovie = (movieObjId) => {
    dispatch(removeMovieItem(movieObjId)).then((response) => {
      if (response.payload.movieInfo.length <= 0) {
        setShowTotalMovie(false);
      }
    });
  };

  let removeFromCart = (productId) => {
    dispatch(removeCartItem(productId)).then((response) => {
      if (response.payload.productInfo.length <= 0) {
        setShowTotalProduct(false);
      }
    });
  };

  const transactionSuccess = (data) => {
    dispatch(
      onSuccessBuy({
        paymentData: data,
        cartDetail: props.user.cartDetail,
      })
    ).then((response) => {
      if (response.payload.success) {
        setShowTotalProduct(false);
        setShowSuccess(true);
      }
    });
  };
  return (
    <div style={{ width: "85%", margin: "4rem auto" }}>
      <h1>My Movie</h1>
      <div>
        <UserMovie
          movies={props.user.movieDetail && props.user.movieDetail}
          removeItem={removeFromMovie}
        />
        {ShowTotalMovie ? <br /> : <Empty description={false} />}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <hr />
      <h1>My Product</h1>
      <div>
        <CartPage
          products={props.user.cartDetail && props.user.cartDetail}
          removeItem={removeFromCart}
        />
        {ShowTotalProduct ? (
          <div
            style={{
              marginTop: "1rem",
              fontSize: "35px",
              color: "white",
              border: "2px solid white",
              backgroundColor: "white",
              width: "20%",
            }}
          >
            <h1>총 금액: 💰{Total}</h1>
          </div>
        ) : ShowSuccess ? (
          <Result status="success" title="Success!" />
        ) : (
          <>
            <br />
            <Empty description={false} />
          </>
        )}

        {ShowTotalProduct && (
          <Paypal onSuccess={transactionSuccess} Price={Total} />
        )}
      </div>
    </div>
  );
}

export default MyMovie;
