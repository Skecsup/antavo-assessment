// app/api/items/route.ts
let items = [
  {
    id: 1,
    name: 'Item 1',
    quantity: 5,
    imgUrl: '/hard.png',
    lastUpdated: Date.now(),
  },
  {
    id: 2,
    name: 'Item 2',
    quantity: 4,
    imgUrl: '/hard.png',
    lastUpdated: Date.now(),
  },
  {
    id: 3,
    name: 'Item 3',
    quantity: 8,
    imgUrl: '/hard.png',
    lastUpdated: Date.now(),
  },
  {
    id: 4,
    name: 'Item 4',
    quantity: 18,
    imgUrl: '/hard.png',
    lastUpdated: Date.now(),
  },
]

export async function GET() {
  return Response.json(items)
}

export async function POST(request: Request) {
  const clientItem = await request.json()
  const serverItem = items.find((i) => i.id === clientItem.id)

  if (!serverItem) {
    return Response.json({ error: 'Item not found' }, { status: 404 })
  }

  if (clientItem.lastUpdated < serverItem.lastUpdated) {
    return Response.json({ error: 'Conflict', serverItem }, { status: 409 })
  }

  const updatedItem = {
    ...serverItem,
    quantity: clientItem.quantity,
    lastUpdated: Date.now(),
  }
  items = items.map((item) => (item.id === clientItem.id ? updatedItem : item))

  return Response.json(updatedItem)
}

export async function PUT() {
  items = items.map((item) => ({
    ...item,
    quantity: item.quantity + 1,
    lastUpdated: Date.now(),
  }))
  return Response.json(items)
}
