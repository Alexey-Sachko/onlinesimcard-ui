import { gql } from "@apollo/client";

import { useMeLazyQuery } from "../lib/types";
import { useEffect } from "react";

export const MeQuery = gql`
  query Me {
    me {
      id
      email
      firstName
      lastName
    }
  }
`;

export const useMe = () => {
  const [execute, { data }] = useMeLazyQuery();

  useEffect(() => {
    execute();
  }, []);

  if (data?.me) {
    const { id, email, lastName, firstName } = data.me;
    return { id, email, lastName, firstName };
  }

  return null;
};
