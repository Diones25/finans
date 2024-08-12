export interface Construction {
  constructions: ConstructionItem[]
  totalConstructions: number
  totalPages: number
  pageSize: number
  page: number
}

export interface ConstructionItem {
  id: string
  name: string
  quantity: number
  unitaryValue: string
  amount: string
  createdAt: string
}
