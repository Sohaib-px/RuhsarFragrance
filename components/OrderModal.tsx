'use client'

import { useOrder } from './OrderContext'
import Image from 'next/image'

export default function OrderModal() {
  const { cartItems, customerForm, modalOpen, total, isConfirming, updateCustomer, confirmOrder, clearCart, setModalOpen, updateQuantity, removeFromCart } = useOrder()

  if (!modalOpen) return null

  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="order-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg border border-gold/20 bg-[#0b0b0b] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-gold/20 pb-4">
          <h3 className="text-2xl font-bold text-[#f5f1e8]">Order Slip</h3>
          <button onClick={() => setModalOpen(false)} className="text-gold hover:text-[#f5f1e8]">×</button>
        </div>

        <div className="mt-6 space-y-6">
          {/* Cart Items */}
          <div>
            <h4 className="section-kicker mb-3">Order Items</h4>
            {cartItems.length === 0 ? (
              <p className="text-[#e8dcc3] text-center py-4">Your cart is empty.</p>
            ) : (
            <div className="space-y-3">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 border border-gold/15 p-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden bg-[#2b1a10] rounded">
                    <Image 
                      src={item.product.image || '/images/3ml.jpeg'} 
                      alt={item.product.name} 
                      fill className="object-cover" 
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-[#f5f1e8]">{item.product.name}</h5>
                    <p className="text-gold">{item.product.size || item.product.contents}</p>
                    
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center border border-gold/30 rounded overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.product, item.quantity - 1)}
                          className="px-2 py-1 bg-gold/10 text-gold hover:bg-gold/20 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-sm text-[#f5f1e8] border-x border-gold/30 min-w-[32px] text-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.product, item.quantity + 1)}
                          className="px-2 py-1 bg-gold/10 text-gold hover:bg-gold/20 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.product)}
                        className="text-xs text-red-400 hover:text-red-300 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gold">
                      PKR {((item.product.discountedPrice || item.product.price) * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            )}
            <div className="mt-4 border-t border-gold/20 pt-3 text-right">
              <p className="text-xl font-bold text-gold">Total: PKR {total.toLocaleString()}</p>
            </div>
          </div>

          {/* Customer Details */}
          <div>
            <h4 className="section-kicker mb-3">Shipping Details</h4>
            <div className="grid gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={customerForm.name}
                onChange={(e) => updateCustomer('name', e.target.value)}
                className="w-full border border-gold/20 bg-transparent px-4 py-3 text-[#f5f1e8] outline-none placeholder:text-[#9f9275] focus:border-gold rounded"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={customerForm.phone}
                onChange={(e) => updateCustomer('phone', e.target.value)}
                className="w-full border border-gold/20 bg-transparent px-4 py-3 text-[#f5f1e8] outline-none placeholder:text-[#9f9275] focus:border-gold rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={customerForm.email}
                onChange={(e) => updateCustomer('email', e.target.value)}
                className="w-full border border-gold/20 bg-transparent px-4 py-3 text-[#f5f1e8] outline-none placeholder:text-[#9f9275] focus:border-gold rounded"
              />
              <textarea
                placeholder="Delivery Address"
                rows={3}
                value={customerForm.address}
                onChange={(e) => updateCustomer('address', e.target.value)}
                className="w-full border border-gold/20 bg-transparent px-4 py-3 text-[#f5f1e8] outline-none placeholder:text-[#9f9275] focus:border-gold rounded resize-vertical"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h4 className="section-kicker mb-3">Payment Method</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <label className="flex flex-1 items-center gap-3 border border-gold/20 p-4 rounded cursor-pointer hover:bg-gold/5 transition-colors">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="cod"
                    checked={customerForm.paymentMethod === 'cod'}
                    onChange={() => updateCustomer('paymentMethod', 'cod')}
                    className="accent-gold h-4 w-4"
                  />
                  <span className="text-[#f5f1e8] font-medium">Cash on Delivery</span>
                </label>
                
                <label className="flex flex-1 items-center gap-3 border border-gold/20 p-4 rounded cursor-pointer hover:bg-gold/5 transition-colors">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="bank"
                    checked={customerForm.paymentMethod === 'bank'}
                    onChange={() => updateCustomer('paymentMethod', 'bank')}
                    className="accent-gold h-4 w-4"
                  />
                  <span className="text-[#f5f1e8] font-medium">Bank Transfer / Wallet</span>
                </label>

                <label className="flex flex-1 items-center gap-3 border border-gold/20 p-4 rounded cursor-pointer hover:bg-gold/5 transition-colors">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="card"
                    checked={customerForm.paymentMethod === 'card'}
                    onChange={() => updateCustomer('paymentMethod', 'card')}
                    className="accent-gold h-4 w-4"
                  />
                  <span className="text-[#f5f1e8] font-medium">Credit/Debit Card</span>
                </label>
              </div>

              {customerForm.paymentMethod === 'bank' && (
                <select
                  value={customerForm.selectedBank}
                  onChange={(e) => updateCustomer('selectedBank', e.target.value)}
                  className="w-full border border-gold/20 bg-[#0b0b0b] px-4 py-3 text-[#f5f1e8] outline-none focus:border-gold rounded appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select Bank or Wallet</option>
                  <optgroup label="Wallets" className="bg-[#2b1a10]">
                    <option value="EasyPaisa">EasyPaisa</option>
                    <option value="JazzCash">JazzCash</option>
                    <option value="NayaPay">NayaPay</option>
                    <option value="SadaPay">SadaPay</option>
                  </optgroup>
                  <optgroup label="Major Banks" className="bg-[#2b1a10]">
                    <option value="Meezan Bank">Meezan Bank</option>
                    <option value="Habib Bank Limited (HBL)">Habib Bank Limited (HBL)</option>
                    <option value="United Bank Limited (UBL)">United Bank Limited (UBL)</option>
                    <option value="MCB Bank">MCB Bank</option>
                    <option value="Bank Alfalah">Bank Alfalah</option>
                    <option value="Allied Bank Limited (ABL)">Allied Bank Limited (ABL)</option>
                    <option value="Askari Bank">Askari Bank</option>
                    <option value="Bank Al Habib">Bank Al Habib</option>
                    <option value="Faysal Bank">Faysal Bank</option>
                    <option value="Standard Chartered">Standard Chartered</option>
                  </optgroup>
                </select>
              )}

              {customerForm.paymentMethod === 'bank' && customerForm.selectedBank && (
                <div className="space-y-4">
                  <div className="border border-gold/20 p-4 rounded bg-gold/5">
                    <p className="text-sm text-gold font-bold mb-2">Transfer Instructions:</p>
                    <p className="text-sm text-[#e8dcc3] mb-3">
                      Please transfer the total amount to the following account:
                    </p>
                    <div className="space-y-1 text-[#f5f1e8] text-sm">
                      <p><span className="text-gold/60 font-medium">Bank/Wallet:</span> {customerForm.selectedBank}</p>
                      <p><span className="text-gold/60 font-medium">Account Title:</span> RUHSAR FRAGRANCES</p>
                      <p><span className="text-gold/60 font-medium">Account Number:</span> 03342708340</p>
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Transaction ID / Reference Number"
                    value={customerForm.transactionId}
                    onChange={(e) => updateCustomer('transactionId', e.target.value)}
                    className="w-full border border-gold/20 bg-[#0b0b0b] px-4 py-3 text-[#f5f1e8] outline-none focus:border-gold rounded"
                  />
                  <div className="space-y-2">
                    <label className="text-xs text-gold/60 font-medium ml-1">Upload Payment Screenshot</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onloadend = () => {
                            updateCustomer('paymentScreenshot', reader.result as string)
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                      className="w-full border border-gold/20 bg-[#0b0b0b] px-4 py-3 text-[#f5f1e8] outline-none focus:border-gold rounded file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gold/10 file:text-gold hover:file:bg-gold/20 cursor-pointer"
                    />
                    {customerForm.paymentScreenshot && (
                      <p className="text-xs text-emerald-400 ml-1">✓ Screenshot attached successfully</p>
                    )}
                  </div>
                </div>
              )}

              {customerForm.paymentMethod === 'card' && (
                <div className="grid grid-cols-2 gap-4 border border-gold/10 p-4 rounded bg-gold/5">
                  <input
                    type="text"
                    placeholder="Card Number (16 digits)"
                    value={customerForm.cardNumber}
                    onChange={(e) => updateCustomer('cardNumber', e.target.value.replace(/\D/g, '').slice(0, 16))}
                    className="col-span-2 w-full border border-gold/20 bg-[#0b0b0b] px-4 py-3 text-[#f5f1e8] outline-none focus:border-gold rounded"
                  />
                  <input
                    type="text"
                    placeholder="Expiry (MM/YY)"
                    value={customerForm.expiryDate}
                    onChange={(e) => updateCustomer('expiryDate', e.target.value.slice(0, 5))}
                    className="w-full border border-gold/20 bg-[#0b0b0b] px-4 py-3 text-[#f5f1e8] outline-none focus:border-gold rounded"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    value={customerForm.cvc}
                    onChange={(e) => updateCustomer('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                    className="w-full border border-gold/20 bg-[#0b0b0b] px-4 py-3 text-[#f5f1e8] outline-none focus:border-gold rounded"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button onClick={() => setModalOpen(false)} className="outline-button flex-1">Continue Shopping</button>
            <button onClick={clearCart} className="outline-button flex-1">Clear Cart</button>
            <button 
              onClick={confirmOrder} 
              disabled={isConfirming}
              className={`flex-1 font-bold ${isConfirming ? 'opacity-50 cursor-not-allowed' : 'gold-button'}`}
            >
              {isConfirming ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/>
                    <path fill="currentColor" className="opacity-100" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Sending...
                </>
              ) : (
                'Confirm Order'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
