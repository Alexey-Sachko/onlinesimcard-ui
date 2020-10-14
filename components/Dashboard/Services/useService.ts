import { ServiceType, useServicesQuery } from "../../../lib/types";

export const useService = ({
  countryCode,
  serviceCode,
}: {
  serviceCode: string;
  countryCode: string;
}): ServiceType | null => {
  const { data } = useServicesQuery({ variables: { countryCode } });

  return (
    data?.services?.find((service) => service.code === serviceCode) || null
  );
};
