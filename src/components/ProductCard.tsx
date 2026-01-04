import type { Product } from "../models/productType";

interface Props {
  product: Product;
  cartQty: number;
  onUpdate: (delta: number) => void;
}

const ProductCard = ({ product, cartQty, onUpdate }: Props) => {
  const remainingStock = product.stock - cartQty;
  const isOutOfStock = product.stock === 0;
  const isAtLimit = cartQty >= product.stock;

  return (
    <div className="card">
      <div className="info">
        <h3>{product.productName}</h3>
        <p className="price-tag">${product.price.toFixed(2)}</p>
        <p className={`stock-tag ${remainingStock < 5 ? 'low' : ''}`}>
          {isOutOfStock ? "Out of Stock" : `${remainingStock} left in stock`}
        </p>
      </div>
      
      <div className="actions">
        {cartQty === 0 ? (
          <button 
            className="add-to-cart-btn"
            onClick={() => onUpdate(1)} 
            disabled={isOutOfStock}
          >
            {isOutOfStock ? "Sold Out" : "Add to Cart"}
          </button>
        ) : (
          <div className="quantity-controls">
            <button onClick={() => onUpdate(-1)} aria-label="Decrease quantity">−</button>
            <span className="qty-display">{cartQty}</span>
            <button 
              onClick={() => onUpdate(1)} 
              disabled={isAtLimit}
              aria-label="Increase quantity"
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