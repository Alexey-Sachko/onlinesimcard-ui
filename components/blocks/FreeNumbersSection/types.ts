export type Countries = "russia" | "ukraine" | "kazakhstan"

export type SetUseState<T> = (value: T | ((prevVal: T) => T)) => void

export type FreeNumbers = {
  countries: Record<string, Country>
  messages: Messages
  numbers: Record<string, Numbers>
  ignore: string
  response: number | string // Когда апи легло, в этом поле появляется сообщение 'TRY_AGAIN_LATER'
}

export type Country = {
  country: number
  country_text: string
}

export type Messages = {
  country: number | null
  current_page: number | null
  data: MessagesData[] | null
  first_page_url: string | null
  from: number | null
  last_page: number | null
  last_page_url: string | null
  next_page_url: string | null
  number: string | null
  path: string | null
  per_page: number | null
  prev_page_url: string | null
  to: number | null
  total: number | null
}

export type MessagesData = {
  created_at: string
  data_humans: string
  in_number: string
  my_number: number
  text: string
}

export type Numbers = {
  country: number
  data_humans: string
  full_number: string
}
