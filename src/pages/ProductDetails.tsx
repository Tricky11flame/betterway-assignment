import { useParams } from "react-router";

function ProductDetails() {
    const {productId} =  useParams();
  return (
    <div>ProductDetails of {productId}</div>
  )
}

export default ProductDetails