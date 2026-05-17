'use client'

import { useEffect, useState } from 'react'
import { useOrder } from './OrderContext'

export default function Toast() {
  const { toast, showToast } = useOrder()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (toast) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  if (!toast || !visible) return null

  const bgColor = toast.type === 'success' ? 'bg-emerald-500/95 border-emerald-400/50' : 
                  'bg-red-500/95 border-red-400/50'

  return (
    <div className={`fixed top-5 right-5 z-[9999] w-80 rounded-xl border p-4 shadow-2xl backdrop-blur-md text-white ${bgColor} animate-in slide-in-from-top-4 fade-in duration-300 border-opacity-80`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {toast.type === 'success' && (
            <svg className="h-6 w-6 text-emerald-100" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
          {toast.type === 'error' && (
            <svg className="h-6 w-6 text-red-100" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm leading-tight text-white/95">{toast.message}</p>
        </div>
        <button 
          onClick={() => showToast('', 'success')} 
          className="flex-shrink-0 ml-2 p-1 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-all duration-200"
          aria-label="Dismiss"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
