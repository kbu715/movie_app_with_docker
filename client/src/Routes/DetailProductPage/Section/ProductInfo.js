import React from "react";
import { Descriptions } from "antd";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../_actions/user_action";

function ProductInfo(props) {
  const dispatch = useDispatch();

  const clickHandler = () => {
    //카트에 넣으면 필요한 정보를 넣어준다.
    dispatch(addToCart(props.detail._id));
  };
  return (
    <div>
      <Descriptions title="상품정보" bordered>
        <Descriptions.Item label="가격">{props.detail.price}</Descriptions.Item>
        <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
        <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {props.detail.description}
        </Descriptions.Item>
      </Descriptions>

      <br />
      <br />
      <br />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="primary" onClick={clickHandler}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductInfo;
