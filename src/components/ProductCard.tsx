import type { Product } from "../models/productType";

interface Props {
  product: Product;
  cartQty: number;
  onUpdate: (delta: number) => void;
}

const ProductCard = ({ product, cartQty, onUpdate }: Props) => {
  const isOutOfStock = product.stock === 0;
  const isAtLimit = cartQty >= product.stock;

  return (
    <div className="card">
      <h3>{product.productName}</h3>
      <p>Price: ${product.price}</p>
      <p>Remaining: {product.stock - cartQty}</p>
      
      <div className="actions">
        {cartQty === 0 ? (
          // Initial State: Add to Cart
          <button 
            className="add-to-cart-btn"
            onClick={() => onUpdate(1)} 
            disabled={isOutOfStock}
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
        ) : (
          // Active State: +/- Controls
          <div className="quantity-controls">
            <button onClick={() => onUpdate(-1)}>-</button>
            <span className="qty-display">{cartQty}</span>
            <button 
              onClick={() => onUpdate(1)} 
              disabled={isAtLimit}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;