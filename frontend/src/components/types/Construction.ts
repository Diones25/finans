export interface Construction {
  spents: SpentsItem[]
  totalConstructions: number
  totalPages: number
  pageSize: number
  page: number
}

export interface SpentsItem {
  id: string
  name: string
  quantity: number
  unitaryValue: string
  amount: string
  createdAt: string
}
