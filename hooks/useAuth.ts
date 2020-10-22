import React from "react";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";

import { MeResponse, useMeLazyQuery } from "../lib/types";

type AuthData = {
  displayName: string;
  auth: boolean;
  me: MeResponse | null;
  loading: boolean;
  called: boolean;
};

export const ME_QUERY = gql`
  query Me {
    me {
      balanceAmount
      email
      firstName
      lastName
    }
  }
`;

export const useAuth = (): AuthData => {
  const router = useRouter();
  const [execute, { data, loading, called, error }] = useMeLazyQuery();

  const auth = Boolean(data?.me);
  const me = data?.me;

  let displayName: string | undefined = undefined;
  if (me) {
    if (me.email) {
      displayName = me.email;
    } else if (me.lastName) {
      displayName = `${me.firstName} ${me.lastName}`;
    } else {
      displayName = `no name`;
    }
  }

  React.useEffect(() => {
    execute();
  }, []);

  return { auth, me, loading, called, displayName };
};
