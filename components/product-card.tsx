'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { Item } from '@/app/page'
import { useState } from 'react'

interface ProductCardProps {
  item: Item
  onQuantityChange: (id: number, quantity: number) => void
}

const ProductCard = ({ item, onQuantityChange }: ProductCardProps) => {
  const [inputValue, setInputValue] = useState(item.quantity.toString())

  useEffect(() => {
    setInputValue(item.quantity.toString())
  }, [item.quantity])

  const handleDirectInput = (value: string) => {
    setInputValue(value)
    const numValue = parseInt(value)
    if (!isNaN(numValue) && numValue >= 0) {
      onQuantityChange(item.id, numValue)
    }
  }

  const handleIncrement = () => {
    const newValue = item.quantity + 1
    setInputValue(newValue.toString())
    onQuantityChange(item.id, newValue)
  }

  const handleDecrement = () => {
    if (item.quantity > 0) {
      const newValue = item.quantity - 1
      setInputValue(newValue.toString())
      onQuantityChange(item.id, newValue)
    }
  }

  return (
    <div className="relative border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="relative w-full h-56 mb-6">
        <Image
          src={item.imgUrl}
          alt={item.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <h2 className="text-xl font-medium text-gray-800 mb-4">{item.name}</h2>

      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={handleDecrement}
          className="w-10 h-10 flex items-center justify-center bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors font-medium text-lg"
        >
          -
        </button>
        <input
          type="number"
          min="0"
          value={inputValue}
          onChange={(e) => handleDirectInput(e.target.value)}
          className="flex-1 min-w-16 px-3 py-2 border border-gray-200 rounded-lg text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleIncrement}
          className="w-10 h-10 flex items-center justify-center bg-green-500 rounded-full text-white hover:bg-green-600 transition-colors font-medium text-lg"
        >
          +
        </button>
      </div>

      <p className="text-sm text-gray-500">
        Last updated: {new Date(item.lastUpdated).toLocaleTimeString()}
      </p>

      {item.pending && (
        <div className="absolute right-4 bottom-4 flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">Updating...</span>
        </div>
      )}
    </div>
  )
}

export default ProductCard
