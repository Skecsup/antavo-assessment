'use client'

import ConflictDialog from '@/components/conflict-dialog'
import ProductCard from '@/components/product-card'
import { useInventoryManagement } from '@/hooks/useInventoryManagement'

export interface Item {
  id: number
  name: string
  quantity: number
  imgUrl: string
  lastUpdated: number
  pending?: boolean
}

export default function ItemsPage() {
  const { items, conflict, updateQuantity, resolveConflict } = useInventoryManagement()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Items</h1>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            onQuantityChange={updateQuantity}
          />
        ))}
      </div>

      {conflict && (
        <ConflictDialog conflict={conflict} resolveConflict={resolveConflict} />
      )}
    </div>
  )
}
