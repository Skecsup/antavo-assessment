import { Item } from '@/app/page'
import React from 'react'

const ConflictDialog = ({
  conflict,
  resolveConflict,
}: {
  conflict: {
    clientItem: Item
    serverItem: Item
  }
  resolveConflict: (useServerVersion: boolean) => void
}) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full mx-4">
        <h2 className="text-2xl text-gray-800 font-medium mb-6">
          Quantity Conflict Detected
        </h2>

        <div className="space-y-4 mb-8">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Your version</p>
            <p className="text-xl text-gray-800 font-medium">
              {conflict.clientItem.quantity} items
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Server version</p>
            <p className="text-xl text-gray-800 font-medium">
              {conflict.serverItem.quantity} items
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => resolveConflict(true)}
            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Use Server's Version
          </button>
          <button
            onClick={() => resolveConflict(false)}
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Keep My Version
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConflictDialog
