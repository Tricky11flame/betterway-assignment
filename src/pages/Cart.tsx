import { useState, useEffect, useMemo } from 'react';
import { getCartFromStorage, getProductsFromStorage, saveCartToStorage } from '../utils/storage';
import { updateCartQuantity, generateBill } from '../utils/cartUtils';
import type { ProductId, ProductMap } from '../models/productType';
import type { CartState } from '../models/cartType';
import "../index.css";
const Cart = () => {
  const [productData] = useState<ProductMap>(() => getProductsFromStorage());
  const [cart, setCart] = useState<CartState>(() => getCartFromStorage());
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);
  const bill = useMemo(() => generateBill(cart, productData), [cart, productData]);
  const handleUpdate = (id: ProductId, delta: number) => {
    const stock = productData[id]?.stock ?? 0;
    setCart(prev => updateCartQuantity(prev, id, delta, stock));
  };

  if (bill.items.length === 0) {
    return (
      <div className="empty-view">
        <p>Your cart is empty</p>
        <button onClick={() => window.location.href = "/"}>Back to Shop</button>
      </div>
    );
  }
  
const handleCheckout = () => {
  setCart({});
  saveCartToStorage({});
  setIsSuccess(true);
};

if (isSuccess) {
  return (
    <div className="empty-view">
      <div className="success-icon">✅</div>
      <h2>Order Placed!</h2>
      <p>Thank you for your purchase.</p>
      <button onClick={() => window.location.href = "/home"}>Continue Shopping</button>
    </div>
  );
}

  return (
    <div className="cart-container">
      <div className="cart-main">
        {bill.items.map((item) => {
  // Use item properties directly or find key by matching name/id
  const productId = item.id; // Ensure generateBill returns the ID
  return (
            <div key={productId} className="cart-item">
              <div className="item-meta">
                <h4>{item.name}</h4>
                <small>${item.unitPrice} each</small>
              </div>
              
              <div className="item-quantity">
                <button onClick={() => handleUpdate(productId, -1)}>−</button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => handleUpdate(productId, 1)}
                  disabled={item.quantity >= (productData[productId]?.stock ?? 0)}
                >+</button>
              </div>
              
              <div className="item-price">
                ${item.subTotal.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>

      <aside className="cart-summary">
        <h3>Summary</h3>
        <div className="summary-row">
          <span>Items ({bill.totalQuantity})</span>
          <span>${bill.totalCost.toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>${bill.totalCost.toFixed(2)}</span>
        </div>
        <button 
          className="checkout-cta" 
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </aside>
    </div>
  );
};

export default Cart;