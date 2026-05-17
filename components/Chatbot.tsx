'use client'

import { useState, useRef, useEffect } from 'react'
import { FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa'
import { useOrder } from './OrderContext'
import { products as individualProducts, bundles as productBundles, heroBundle as heroProduct } from './Article' // Import all product types
import React from 'react' // Import React for React.ReactNode

interface Message {
  id: number
  sender: 'user' | 'bot'
  text: string
  actionButtons?: React.ReactNode[] // Changed to array to hold multiple buttons
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null) // Corrected: This was missing in the previous diff
  const { setModalOpen, addToCart } = useOrder()

  const allAvailableProducts = [
    ...individualProducts,
    ...productBundles,
    heroProduct,
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (text: string = inputValue) => {
    if (text.trim() === '') return

    const newUserMessage: Message = { id: Date.now(), sender: 'user', text }
    setMessages((prevMessages) => [...prevMessages, newUserMessage])
    setInputValue('')

    // Simulate bot response
    setTimeout(() => {
      let botResponseText = "Hello! How can I assist you today?"
      let actionButtons: React.ReactNode[] | null = null // Changed to array

      if (text.toLowerCase().includes('booking') || text.toLowerCase().includes('order')) {
        botResponseText = "Sure! Which item would you like to add to your cart and open the order form for?"
        actionButtons = allAvailableProducts.map((product, index) => (
          <button
            key={index}
            onClick={() => {
              addToCart(product) // Add the selected product
              setModalOpen(true)
              setIsOpen(false) // Close chatbot after opening modal
            }}
            className="mt-2 px-3 py-1.5 bg-gold text-white text-sm rounded-md hover:bg-gold/80 transition-colors block w-full text-left"
          >
            {product.name} {product.size || product.contents ? `- ${product.size || product.contents}` : ''} (PKR {product.price})
          </button>
        ));
      } else if (text.toLowerCase().includes('hello') || text.toLowerCase().includes('hi')) {
        botResponseText = "Hi there! I'm Ruhsar's virtual assistant. Ask me anything about our attars or if you'd like to place an order."
      } else if (text.toLowerCase().includes('product') || text.toLowerCase().includes('attar')) {
        botResponseText = "We specialize in non-alcoholic attars, currently featuring 'Impression by Invictus' in 3ml, 6ml, and 12ml bottles, as well as discovery and luxury packs."
      } else if (text.toLowerCase().includes('contact')) {
        botResponseText = "You can reach us at ruhsarfragrancepk@gmail.com or +92 3342708340."
      }

      const newBotMessage: Message = { id: Date.now() + 1, sender: 'bot', text: botResponseText }
      setMessages((prevMessages) => { // Use a functional update for setMessages
        const updatedMessages = [...prevMessages, newBotMessage];
        if (actionButtons && actionButtons.length > 0) {
          // Add a message entry for the action buttons
          updatedMessages.push({ id: Date.now() + 2, sender: 'bot', text: '', actionButtons });
        }
        return updatedMessages;
      });
    }, 1000)
  }

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-20 right-5 z-[1000] w-80 h-[400px] bg-[#0b0b0b] border border-gold/20 rounded-lg shadow-xl flex flex-col">
          <div className="flex justify-between items-center p-3 border-b border-gold/10">
            <h3 className="text-lg font-semibold text-gold">Ruhsar Chatbot</h3>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
              <FaTimes size={16} />
            </button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] p-2 rounded-lg ${msg.sender === 'user' ? 'bg-gold text-white' : 'bg-gray-700 text-white'}`}>
                  {msg.text}
                  {msg.actionButtons && ( // Render multiple action buttons
                    <div className="mt-2 space-y-2">
                      {msg.actionButtons.map((button, btnIdx) => (
                        <React.Fragment key={btnIdx}>{button}</React.Fragment>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t border-gold/10 flex">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 bg-transparent border border-gold/20 text-white px-3 py-2 rounded-l-md focus:outline-none focus:border-gold"
            />
            <button
              onClick={() => handleSendMessage()}
              className="px-4 py-2 bg-gold text-white rounded-r-md hover:bg-gold/80 transition-colors"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-[1000] bg-gold text-white p-4 rounded-full shadow-lg hover:bg-gold/80 transition-colors"
        aria-label="Open Chatbot"
      >
        <FaRobot size={24} />
      </button>
    </>
  )
}