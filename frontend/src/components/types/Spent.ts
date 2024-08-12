export interface Spent {
  spents: SpentItem[]
  totalSpents: number
  totalPages: number
  pageSize: number
  page: number
}

export interface SpentItem {
  id: string
  value: string
  description: string
  createdAt: string
  category: Category
}

export interface Category {
  name: string
}
