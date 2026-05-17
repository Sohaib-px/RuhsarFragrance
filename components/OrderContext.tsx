'use client'

import { createContext, useContext, useState, ReactNode, useCallback } from 'react'

export interface Product {
  name: string
  size?: string
  contents?: string | string[]
  price: number
  image?: string
  label?: string
  badge?: string
  description?: string
  originalPrice?: number
  discountedPrice?: number
}

interface CartItem {
  product: Product
  quantity: number
}

interface CustomerForm {
  name: string
  email: string
  phone: string
  address: string
  paymentMethod: 'cod' | 'bank' | 'card'
  selectedBank: string
  cardNumber: string
  expiryDate: string
  cvc: string
  transactionId: string
  paymentScreenshot: string
}

interface OrderContextType {
  cartItems: CartItem[]
  customerForm: CustomerForm
  modalOpen: boolean
  total: number
  isConfirming: boolean
  toast: {message: string, type: 'success' | 'error'} | null
  addToCart: (product: Product, quantity?: number) => void
  updateQuantity: (product: Product, quantity: number) => void
  removeFromCart: (product: Product) => void
  updateCustomer: (field: keyof CustomerForm, value: any) => void
  confirmOrder: () => Promise<void>
  clearCart: () => void
  toggleModal: () => void
  setModalOpen: (open: boolean) => void
  showToast: (message: string, type?: 'success' | 'error') => void
}

const OrderContext = createContext<OrderContextType | null>(null)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [customerForm, setCustomerForm] = useState<CustomerForm>({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'cod',
    selectedBank: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    transactionId: '',
    paymentScreenshot: '',
  })
  const [modalOpen, setModalOpen] = useState(false)

  const total = cartItems.reduce((sum, item) => sum + (item.product.discountedPrice || item.product.price) * item.quantity, 0)

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.name === product.name && item.product.size === product.size)
      if (existing) {
        return prev.map(item => 
          item.product.name === product.name && item.product.size === product.size 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        )
      }
      return [...prev, { product, quantity }]
    })
    showToast(`${quantity}x ${product.name} added to cart`)
    setModalOpen(true)
  }, [])

  const updateQuantity = useCallback((product: Product, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(product)
      return
    }
    setCartItems(prev => prev.map(item => 
      item.product.name === product.name && item.product.size === product.size 
        ? { ...item, quantity } 
        : item
    ))
  }, [])

  const removeFromCart = useCallback((product: Product) => {
    setCartItems(prev => prev.filter(item => 
      !(item.product.name === product.name && item.product.size === product.size)
    ))
  }, [])

  const updateCustomer = useCallback((field: keyof CustomerForm, value: any) => {
    setCustomerForm(prev => ({ ...prev, [field]: value }))
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
    setCustomerForm({ 
      name: '', 
      email: '', 
      phone: '', 
      address: '', 
      paymentMethod: 'cod', 
      selectedBank: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
      transactionId: '',
      paymentScreenshot: '',
    })
  }, [])

  const toggleModal = useCallback(() => setModalOpen(prev => !prev), [])

  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null)

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    if (!message) {
      setToast(null)
      return
    }
    setToast({ message, type })
  }

  const [isConfirming, setIsConfirming] = useState(false)

  const confirmOrder = async () => {
    if (!customerForm.name || !customerForm.email || !customerForm.phone || !customerForm.address || cartItems.length === 0) {
      showToast('Please fill all fields and add items to cart.', 'error')
      return
    }

    if (customerForm.paymentMethod === 'bank' && !customerForm.selectedBank) {
      showToast('Please select a bank or wallet for transfer.', 'error')
      return
    }

    if (customerForm.paymentMethod === 'bank' && (!customerForm.selectedBank || !customerForm.transactionId || !customerForm.paymentScreenshot)) {
      showToast('Please select a bank, provide the Transaction ID, and upload a payment screenshot.', 'error')
      return
    }

    if (customerForm.paymentMethod === 'card' && (!customerForm.cardNumber || !customerForm.expiryDate || !customerForm.cvc)) {
      showToast('Please fill all card details.', 'error')
      return
    }

    setIsConfirming(true)
    const orderData = {
      customer: customerForm,
      cartItems,
      total,
      date: new Date().toLocaleString('pk-PK'),
    }

    // Background API call
    try {
      const res = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })

      if (!res.ok) {
        throw new Error('Failed to send email')
      }
      
      showToast('Order confirmed! Your order has been placed successfully.')
      clearCart()
      setModalOpen(false)
      console.log('Order email sent successfully')
    } catch (err) {
      console.error('Background email send failed:', err)
      showToast('Order failed. Please check your connection and try again.', 'error')
    } finally {
      setIsConfirming(false)
    }
  }

  return (
    <OrderContext.Provider value={{
      cartItems,
      customerForm,
      modalOpen,
      total,
      isConfirming,
      toast,
      addToCart,
      updateQuantity,
      removeFromCart,
      updateCustomer,
      confirmOrder,
      clearCart,
      toggleModal,
      setModalOpen,
      showToast,
    }}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrder = () => {
  const context = useContext(OrderContext)
  if (!context) throw new Error('useOrder must be used within OrderProvider')
  return context
}
