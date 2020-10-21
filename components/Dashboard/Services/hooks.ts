import { gql } from "@apollo/client";
import { useAllServicesQuery } from "../../../lib/types";

export const ALL_SERVICES_QUERY = gql`
  query AllServices {
    allServices {
      code
      name
    }
  }
`;

export const useServiceName = (code: string): string | undefined => {
  const { data } = useAllServicesQuery({ nextFetchPolicy: "cache-only" });
  return data?.allServices.find((service) => service.code === code)?.name;
};
