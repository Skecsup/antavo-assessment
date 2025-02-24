import { useState, useEffect } from 'react'
import { Item } from '@/app/page'

interface ConflictState {
  clientItem: Item
  serverItem: Item
}

export function useInventoryManagement() {
  const [items, setItems] = useState<Item[]>([])
  const [conflict, setConflict] = useState<ConflictState | null>(null)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('/api/items')
        const data = await res.json()
        setItems((currentItems) =>
          data.map((serverItem: Item) => {
            const currentItem = currentItems.find((i) => i.id === serverItem.id)
            return currentItem?.pending ? currentItem : serverItem
          })
        )
      } catch (error) {
        console.error('Fetch error:', error)
      }
    }

    fetchItems()
    const interval = setInterval(fetchItems, 1000)
    return () => clearInterval(interval)
  }, [])

  const updateQuantity = async (id: number, newQuantity: number) => {
    const previousItems = items
    const currentItem = items.find((item) => item.id === id)!

    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: newQuantity, pending: true }
          : item
      )
    )

    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...currentItem,
          quantity: newQuantity,
        }),
      })

      if (!response.ok) {
        if (response.status === 409) {
          const { serverItem } = await response.json()
          setConflict({
            clientItem: { ...currentItem, quantity: newQuantity },
            serverItem,
          })
        }
        throw new Error('Update failed')
      }

      const updatedItem = await response.json()
      setItems(
        items.map((item) =>
          item.id === id ? { ...updatedItem, pending: false } : item
        )
      )
    } catch (error) {
      setItems(previousItems)
    }
  }

  const resolveConflict = (useServerVersion: boolean) => {
    if (!conflict) return

    if (useServerVersion) {
      setItems(
        items.map((item) =>
          item.id === conflict.serverItem.id
            ? { ...conflict.serverItem, pending: false }
            : item
        )
      )
    } else {
      updateQuantity(conflict.clientItem.id, conflict.clientItem.quantity)
    }

    setConflict(null)
  }

  return {
    items,
    conflict,
    updateQuantity,
    resolveConflict,
  }
}
