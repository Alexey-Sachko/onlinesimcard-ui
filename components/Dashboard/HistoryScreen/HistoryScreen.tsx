import { gql } from "@apollo/client";
import { Box, IconButton, Typography } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { ArrowBack } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import {
  useMyHistoryActivationsQuery,
  useCountriesQuery,
  ActivationStatus,
} from "../../../lib/types";
import { ServiceIcon } from "../Services/ServiceIcon";
import StatusChip from "./StatusChip";

export const HISTORY_DISPLAY_ACTIVATION = gql`
  fragment HistoryDisplayActivation on ActivationType {
    id
    status
    phoneNum
    cost
    serviceCode
    countryCode
    activationCodes {
      code
      id
    }
  }
`;

export const MY_HISTORY_ACTIVATIONS_QUERY = gql`
  query MyHistoryActivations($pagination: PaginationGqlInput!) {
    myActivationsCount(isCurrent: false)
    myActivations(pagination: $pagination, isCurrent: false) {
      ...HistoryDisplayActivation
    }
  }

  ${HISTORY_DISPLAY_ACTIVATION}
`;

const LIMIT = 20;

const HistoryScreen = () => {
  const [page, setPage] = React.useState(1);
  const history = useHistory();

  const pagination = React.useMemo(
    () => ({ limit: LIMIT, offset: (page - 1) * LIMIT }),
    [page]
  );

  const { data, fetchMore } = useMyHistoryActivationsQuery({
    variables: { pagination },
  });

  const cQuery = useCountriesQuery();
  const countries = cQuery.data?.countries;

  React.useEffect(() => {
    fetchMore({ variables: { pagination } });
  }, [pagination]);

  const onGoBack = () => {
    history.goBack();
  };

  return (
    <Box py={2} px={3} height="100%" width="100%">
      <Box display="flex" alignItems="center" mb={1}>
        <IconButton size="small" onClick={onGoBack}>
          <ArrowBack />
        </IconButton>
        <Typography variant="body1">История:</Typography>
      </Box>
      <Box height="calc(100% - 30px)" width="100%">
        <DataGrid
          density="compact"
          disableColumnMenu
          disableColumnSelector
          disableColumnFilter
          disableColumnReorder
          disableColumnResize
          disableMultipleColumnsSorting
          disableDensitySelector
          disableExtendRowFullWidth
          disableMultipleColumnsFiltering
          disableMultipleSelection
          disableSelectionOnClick
          sortingMode="server"
          columns={[
            { field: "id", headerName: "#id" },
            { field: "phoneNum", headerName: "Номер", width: 200 },
            {
              field: "countryCode",
              headerName: "Страна",
              flex: 0.1,
              renderCell: ({ value }) => {
                const country = countries?.find((c) => c.code === value);
                return <>{country?.name || `Код: ${value}`}</>;
              },
            },
            {
              field: "serviceCode",
              headerName: "Сервис",
              flex: 0.1,
              renderCell: ({ value }) => {
                return <ServiceIcon code={value as string} />;
              },
            },
            { field: "cost", headerName: "Цена", flex: 0.1 },
            {
              field: "status",
              headerName: "Статус",
              flex: 0.1,
              renderCell: ({ value }) => {
                return <StatusChip status={value as ActivationStatus} />;
              },
            },
          ]}
          rows={data?.myActivations || []}
          pageSize={LIMIT}
          page={page}
          paginationMode="server"
          rowCount={data?.myActivationsCount}
          onPageChange={({ page }) => setPage(page)}
        />
      </Box>
    </Box>
  );
};

export default HistoryScreen;
