import React from "react"
import { gql } from "@apollo/client"
import { useRouter } from "next/router"

import { MeResponse, useLogoutMutation, useMeLazyQuery } from "../lib/types"

type AuthData = {
  displayName: string
  auth: boolean
  me: MeResponse | null
  loading: boolean
  called: boolean
  logout: () => void
}

export const ME_QUERY = gql`
  query Me {
    me {
      id
      balanceAmount
      email
      firstName
      lastName
    }
  }
`

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`

export const useAuth = (): AuthData => {
  const router = useRouter()
  const [
    execute,
    { data, loading, called, error, startPolling, stopPolling },
  ] = useMeLazyQuery({
    onError: () => stopPolling(),
    onCompleted: () => startPolling(3000),
    pollInterval: 3000,
    fetchPolicy: "cache-and-network",
  })
  const [logoutRequest] = useLogoutMutation()

  const auth = Boolean(data?.me)
  const me = data?.me

  let displayName: string | undefined = undefined
  if (me) {
    if (me.email) {
      displayName = me.email
    } else if (me.lastName) {
      displayName = `${me.firstName} ${me.lastName}`
    } else {
      displayName = `no name`
    }
  }

  const logout = React.useCallback(async () => {
    await logoutRequest()
    await execute()
  }, [logoutRequest])

  React.useEffect(() => {
    execute()
  }, [execute])

  return { auth, me, loading, called, displayName, logout }
}
