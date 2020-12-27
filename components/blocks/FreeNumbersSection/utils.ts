import axios from "axios"
import { SetUseState } from "./NumberItem/NumberItem"
import { FreeNumbers } from "./types"

const HOST = "https://onlinesim.ru/api"

type GetFreeList = {
  page?: number | null
  number?: number | string | null
  subkey?: string | null
  lang?: string
  country?: number
  setLoading?: SetUseState<boolean>
}

export const getFreeList = async ({
  page = null,
  number = null,
  subkey = null,
  country = null,
  lang = "ru",
  setLoading,
}: GetFreeList): Promise<FreeNumbers> => {
  setLoading?.(true)
  const freeList = await axios.get<FreeNumbers>(`${HOST}/getFreeList`, {
    params: {
      page,
      number,
      lang,
      subkey,
      country,
    },
  })
  setLoading?.(false)

  return freeList.data
}
