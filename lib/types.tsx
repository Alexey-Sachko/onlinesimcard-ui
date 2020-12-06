import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  me: MeResponse;
  roles: Array<RoleType>;
  users: Array<UserType>;
  allPermissions: Array<Permissions>;
  myCurrentActivations: Array<ActivationType>;
  countriesFromApi: Array<CountryApiType>;
  services: Array<ServiceType>;
  prices: Array<PriceType>;
  allServices: Array<ServiceDictionaryItemType>;
  transactions: Array<TransactionGqlType>;
  freeCountries: Array<FreeCountryType>;
  freeNumbers: Array<FreeNumType>;
  freeNumber: FreeNumType;
  freeMessages: FreeMessagesType;
  articles: Array<ArticleType>;
  articlesCount: Scalars['Float'];
  article?: Maybe<ArticleType>;
  myOrders: Array<OrderType>;
};


export type QueryServicesArgs = {
  countryCode: Scalars['String'];
};


export type QueryFreeNumberArgs = {
  num: Scalars['String'];
};


export type QueryFreeMessagesArgs = {
  page?: Maybe<Scalars['Int']>;
  number: Scalars['String'];
};


export type QueryArticleArgs = {
  id: Scalars['Float'];
};

export type MeResponse = {
  __typename?: 'MeResponse';
  id: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Permissions>>;
  balanceAmount: Scalars['Float'];
};

/** Разрешения */
export enum Permissions {
  ReadUsers = 'ReadUsers',
  WriteUsers = 'WriteUsers',
  RolesRead = 'RolesRead',
  RolesWrite = 'RolesWrite',
  ReadEmail = 'ReadEmail',
  WriteEmail = 'WriteEmail',
  ReadAdminPage = 'ReadAdminPage',
  WriteArticles = 'WriteArticles',
  WriteServices = 'WriteServices',
  WriteStubs = 'WriteStubs',
  MakeBonusMoney = 'MakeBonusMoney'
}

export type RoleType = {
  __typename?: 'RoleType';
  id: Scalars['Float'];
  name: Scalars['String'];
  permissions: Array<Permissions>;
};

export type UserType = {
  __typename?: 'UserType';
  id: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  role: RoleType;
};

export type ActivationType = {
  __typename?: 'ActivationType';
  id: Scalars['Float'];
  status: ActivationStatus;
  phoneNum: Scalars['String'];
  cost: Scalars['Float'];
  serviceCode: Scalars['String'];
  expiresAt: Scalars['DateTime'];
  sourceActivationId: Scalars['String'];
  activationCodes?: Maybe<Array<ActivationCodeType>>;
};

export enum ActivationStatus {
  WaitCode = 'WAIT_CODE',
  WaitAgain = 'WAIT_AGAIN',
  SendingConfirmed = 'SENDING_CONFIRMED',
  SmsRecieved = 'SMS_RECIEVED',
  Cancelled = 'CANCELLED',
  Finished = 'FINISHED',
  Error = 'ERROR'
}


export type ActivationCodeType = {
  __typename?: 'ActivationCodeType';
  id: Scalars['Float'];
  code: Scalars['String'];
  activationId: Scalars['Float'];
};

export type CountryApiType = {
  __typename?: 'CountryApiType';
  code: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type ServiceType = {
  __typename?: 'ServiceType';
  id: Scalars['Float'];
  code: Scalars['String'];
  name: Scalars['String'];
  priceAmount?: Maybe<Scalars['Float']>;
  count: Scalars['Float'];
};

export type PriceType = {
  __typename?: 'PriceType';
  id: Scalars['Float'];
  amount: Scalars['Float'];
  countryCode: Scalars['String'];
  serviceId: Scalars['Float'];
};

export type ServiceDictionaryItemType = {
  __typename?: 'ServiceDictionaryItemType';
  code: Scalars['String'];
  name: Scalars['String'];
};

export type TransactionGqlType = {
  __typename?: 'TransactionGqlType';
  type: TransactionType;
  id: Scalars['String'];
  amount: Scalars['Float'];
  balanceBefore: Scalars['Float'];
  createdAt: Scalars['String'];
  userId: Scalars['String'];
};

export enum TransactionType {
  Payment = 'Payment',
  Bonus = 'Bonus',
  Buy = 'Buy'
}

export type FreeCountryType = {
  __typename?: 'FreeCountryType';
  country: Scalars['Int'];
  country_text?: Maybe<Scalars['String']>;
  numbers: Array<FreeNumType>;
};

export type FreeNumType = {
  __typename?: 'FreeNumType';
  maxdate?: Maybe<Scalars['String']>;
  number: Scalars['String'];
  country: Scalars['Int'];
  updated_at: Scalars['String'];
  data_humans: Scalars['String'];
  full_number: Scalars['String'];
  country_text: Scalars['String'];
  messages: FreeMessagesType;
};


export type FreeNumTypeMessagesArgs = {
  page?: Maybe<Scalars['Int']>;
};

export type FreeMessagesType = {
  __typename?: 'FreeMessagesType';
  current_page: Scalars['Int'];
  from?: Maybe<Scalars['Int']>;
  to?: Maybe<Scalars['Int']>;
  per_page: Scalars['Int'];
  total: Scalars['Int'];
  data: Array<FreeMessageType>;
};

export type FreeMessageType = {
  __typename?: 'FreeMessageType';
  text: Scalars['String'];
};

export type ArticleType = {
  __typename?: 'ArticleType';
  id: Scalars['ID'];
  alias: Scalars['String'];
  title: Scalars['String'];
  text: Scalars['String'];
};

export type OrderType = {
  __typename?: 'OrderType';
  id: Scalars['Float'];
  paymentId?: Maybe<Scalars['String']>;
  amount: Scalars['Float'];
  status: OrderStatus;
  createdAt: Scalars['DateTime'];
};

export enum OrderStatus {
  WaitPay = 'WAIT_PAY',
  Error = 'ERROR',
  Paid = 'PAID'
}

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<Array<ErrorType>>;
  logout: Scalars['Boolean'];
  register: RegisterPayloadType;
  resetPassword: ResetPassResponse;
  resetPasswordConfirm?: Maybe<ErrorType>;
  verifyUser?: Maybe<ErrorType>;
  deleteUser?: Maybe<ErrorType>;
  setRole?: Maybe<Array<ErrorType>>;
  create100StubActivations?: Maybe<Array<ErrorType>>;
  createStubActivation?: Maybe<Array<ErrorType>>;
  createActivation?: Maybe<Array<ErrorType>>;
  cancelActivation?: Maybe<Array<ErrorType>>;
  finishActivation?: Maybe<Array<ErrorType>>;
  saveService?: Maybe<Array<ErrorType>>;
  deleteService?: Maybe<Array<ErrorType>>;
  restoreService?: Maybe<Array<ErrorType>>;
  saveServicesWithPrices?: Maybe<Array<ErrorType>>;
  savePrice?: Maybe<Array<ErrorType>>;
  makeBonus?: Maybe<Array<ErrorType>>;
  createArticle?: Maybe<Array<ErrorType>>;
  updateArticle?: Maybe<Array<ErrorType>>;
  deleteArticle?: Maybe<ErrorType>;
  makePayment: MakePaymentResType;
};


export type MutationLoginArgs = {
  authCredentialsDto: AuthCredentialsDto;
};


export type MutationRegisterArgs = {
  userSignupDto: UserSignupDto;
};


export type MutationResetPasswordArgs = {
  resetPassInput: ResetPassInput;
};


export type MutationResetPasswordConfirmArgs = {
  resetPassConfirmInput: ResetPassConfirmInput;
};


export type MutationVerifyUserArgs = {
  verifyToken: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationSetRoleArgs = {
  userId: Scalars['String'];
  roleName: Scalars['String'];
};


export type MutationCreate100StubActivationsArgs = {
  createActivationInput: CreateActivationInput;
};


export type MutationCreateStubActivationArgs = {
  createActivationInput: CreateActivationInput;
};


export type MutationCreateActivationArgs = {
  createActivationInput: CreateActivationInput;
};


export type MutationCancelActivationArgs = {
  activationId: Scalars['Int'];
};


export type MutationFinishActivationArgs = {
  activationId: Scalars['Int'];
};


export type MutationSaveServiceArgs = {
  price: Scalars['Float'];
  countryCode: Scalars['String'];
  createServiceDto: CreateServiceDto;
};


export type MutationDeleteServiceArgs = {
  code: Scalars['String'];
};


export type MutationRestoreServiceArgs = {
  code: Scalars['String'];
};


export type MutationSaveServicesWithPricesArgs = {
  countryCode: Scalars['String'];
  servicesWithPrices: Array<CreateServiceWithPricesDto>;
};


export type MutationSavePriceArgs = {
  createPriceDto: CreatePriceDto;
};


export type MutationMakeBonusArgs = {
  makeBonusInput: MakeBonusInput;
};


export type MutationCreateArticleArgs = {
  createArticleDto: CreateArticleDto;
};


export type MutationUpdateArticleArgs = {
  updateArticleDto: UpdateArticleDto;
};


export type MutationDeleteArticleArgs = {
  id: Scalars['Float'];
};


export type MutationMakePaymentArgs = {
  makePaymenInput: MakePaymentInput;
};

export type AuthCredentialsDto = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ErrorType = {
  __typename?: 'ErrorType';
  path: Scalars['String'];
  message: Scalars['String'];
};

export type UserSignupDto = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterPayloadType = {
  __typename?: 'RegisterPayloadType';
  result?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<ErrorType>>;
};

export type ResetPassInput = {
  email: Scalars['String'];
};

export type ResetPassResponse = {
  __typename?: 'ResetPassResponse';
  accessAgain?: Maybe<Scalars['DateTime']>;
  error?: Maybe<ErrorType>;
};

export type ResetPassConfirmInput = {
  newPassword: Scalars['String'];
  tokenId: Scalars['String'];
};

export type CreateActivationInput = {
  serviceCode: Scalars['String'];
  countryCode: Scalars['String'];
};

export type CreateServiceDto = {
  code: Scalars['String'];
};

export type CreateServiceWithPricesDto = {
  code: Scalars['String'];
  price: Scalars['Float'];
};

export type CreatePriceDto = {
  serviceCode: Scalars['String'];
  countryCode: Scalars['String'];
  amount: Scalars['Float'];
};

export type MakeBonusInput = {
  amount: Scalars['Float'];
  targetUserId: Scalars['String'];
};

export type CreateArticleDto = {
  alias: Scalars['String'];
  title: Scalars['String'];
  text: Scalars['String'];
};

export type UpdateArticleDto = {
  alias: Scalars['String'];
  title: Scalars['String'];
  text: Scalars['String'];
  id: Scalars['Int'];
};

export type MakePaymentInput = {
  amount: Scalars['Float'];
};

export type MakePaymentResType = {
  __typename?: 'MakePaymentResType';
  orderId: Scalars['Float'];
  url: Scalars['String'];
};

export type CreateActivationMutationVariables = Exact<{
  createActivationInput: CreateActivationInput;
}>;


export type CreateActivationMutation = (
  { __typename?: 'Mutation' }
  & { createActivation?: Maybe<Array<(
    { __typename?: 'ErrorType' }
    & Pick<ErrorType, 'path' | 'message'>
  )>> }
);

export type CountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CountriesQuery = (
  { __typename?: 'Query' }
  & { countriesFromApi: Array<(
    { __typename?: 'CountryApiType' }
    & Pick<CountryApiType, 'code' | 'name'>
  )> }
);

export type DisplayActivationFragment = (
  { __typename?: 'ActivationType' }
  & Pick<ActivationType, 'id' | 'status' | 'phoneNum' | 'cost' | 'expiresAt' | 'serviceCode'>
  & { activationCodes?: Maybe<Array<(
    { __typename?: 'ActivationCodeType' }
    & Pick<ActivationCodeType, 'code' | 'id'>
  )>> }
);

export type MyCurrentActivationsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyCurrentActivationsQuery = (
  { __typename?: 'Query' }
  & { myCurrentActivations: Array<(
    { __typename?: 'ActivationType' }
    & DisplayActivationFragment
  )> }
);

export type CancelActivationMutationVariables = Exact<{
  activationId: Scalars['Int'];
}>;


export type CancelActivationMutation = (
  { __typename?: 'Mutation' }
  & { cancelActivation?: Maybe<Array<(
    { __typename?: 'ErrorType' }
    & Pick<ErrorType, 'path' | 'message'>
  )>> }
);

export type FinishActivationMutationVariables = Exact<{
  activationId: Scalars['Int'];
}>;


export type FinishActivationMutation = (
  { __typename?: 'Mutation' }
  & { finishActivation?: Maybe<Array<(
    { __typename?: 'ErrorType' }
    & Pick<ErrorType, 'path' | 'message'>
  )>> }
);

export type MakePaymentMutationVariables = Exact<{
  makePaymentInput: MakePaymentInput;
}>;


export type MakePaymentMutation = (
  { __typename?: 'Mutation' }
  & { makePayment: (
    { __typename?: 'MakePaymentResType' }
    & Pick<MakePaymentResType, 'orderId' | 'url'>
  ) }
);

export type MyOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type MyOrdersQuery = (
  { __typename?: 'Query' }
  & { myOrders: Array<(
    { __typename?: 'OrderType' }
    & Pick<OrderType, 'id' | 'paymentId' | 'amount' | 'status' | 'createdAt'>
  )> }
);

export type ServicesQueryVariables = Exact<{
  countryCode: Scalars['String'];
}>;


export type ServicesQuery = (
  { __typename?: 'Query' }
  & { services: Array<(
    { __typename?: 'ServiceType' }
    & Pick<ServiceType, 'id' | 'code' | 'name' | 'priceAmount' | 'count'>
  )> }
);

export type AllServicesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllServicesQuery = (
  { __typename?: 'Query' }
  & { allServices: Array<(
    { __typename?: 'ServiceDictionaryItemType' }
    & Pick<ServiceDictionaryItemType, 'code' | 'name'>
  )> }
);

export type ResetPasswordMutationVariables = Exact<{
  resetPassInput: ResetPassInput;
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword: (
    { __typename?: 'ResetPassResponse' }
    & Pick<ResetPassResponse, 'accessAgain'>
    & { error?: Maybe<(
      { __typename?: 'ErrorType' }
      & Pick<ErrorType, 'path' | 'message'>
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  authCredentialsDto: AuthCredentialsDto;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<Array<(
    { __typename?: 'ErrorType' }
    & Pick<ErrorType, 'path' | 'message'>
  )>> }
);

export type RegisterMutationVariables = Exact<{
  userSignupDto: UserSignupDto;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'RegisterPayloadType' }
    & Pick<RegisterPayloadType, 'result'>
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorType' }
      & Pick<ErrorType, 'path' | 'message'>
    )>> }
  ) }
);

export type ResetPasswordConfirmMutationVariables = Exact<{
  resetPassConfirmInput: ResetPassConfirmInput;
}>;


export type ResetPasswordConfirmMutation = (
  { __typename?: 'Mutation' }
  & { resetPasswordConfirm?: Maybe<(
    { __typename?: 'ErrorType' }
    & Pick<ErrorType, 'path' | 'message'>
  )> }
);

export type GetArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetArticlesQuery = (
  { __typename?: 'Query' }
  & { articles: Array<(
    { __typename?: 'ArticleType' }
    & Pick<ArticleType, 'id' | 'alias' | 'title' | 'text'>
  )> }
);

export type CreateArticleMutationVariables = Exact<{
  createArticleDto: CreateArticleDto;
}>;


export type CreateArticleMutation = (
  { __typename?: 'Mutation' }
  & { createArticle?: Maybe<Array<(
    { __typename?: 'ErrorType' }
    & Pick<ErrorType, 'path' | 'message'>
  )>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'MeResponse' }
    & Pick<MeResponse, 'id' | 'balanceAmount' | 'email' | 'firstName' | 'lastName'>
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type VerifyUserMutationVariables = Exact<{
  verifyToken: Scalars['String'];
}>;


export type VerifyUserMutation = (
  { __typename?: 'Mutation' }
  & { verifyUser?: Maybe<(
    { __typename?: 'ErrorType' }
    & Pick<ErrorType, 'path' | 'message'>
  )> }
);

export const DisplayActivationFragmentDoc = gql`
    fragment DisplayActivation on ActivationType {
  id
  status
  phoneNum
  cost
  expiresAt
  serviceCode
  activationCodes {
    code
    id
  }
}
    `;
export const CreateActivationDocument = gql`
    mutation CreateActivation($createActivationInput: CreateActivationInput!) {
  createActivation(createActivationInput: $createActivationInput) {
    path
    message
  }
}
    `;
export type CreateActivationMutationFn = ApolloReactCommon.MutationFunction<CreateActivationMutation, CreateActivationMutationVariables>;

/**
 * __useCreateActivationMutation__
 *
 * To run a mutation, you first call `useCreateActivationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateActivationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createActivationMutation, { data, loading, error }] = useCreateActivationMutation({
 *   variables: {
 *      createActivationInput: // value for 'createActivationInput'
 *   },
 * });
 */
export function useCreateActivationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateActivationMutation, CreateActivationMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateActivationMutation, CreateActivationMutationVariables>(CreateActivationDocument, baseOptions);
      }
export type CreateActivationMutationHookResult = ReturnType<typeof useCreateActivationMutation>;
export type CreateActivationMutationResult = ApolloReactCommon.MutationResult<CreateActivationMutation>;
export type CreateActivationMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateActivationMutation, CreateActivationMutationVariables>;
export const CountriesDocument = gql`
    query Countries {
  countriesFromApi {
    code
    name
  }
}
    `;

/**
 * __useCountriesQuery__
 *
 * To run a query within a React component, call `useCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCountriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CountriesQuery, CountriesQueryVariables>) {
        return ApolloReactHooks.useQuery<CountriesQuery, CountriesQueryVariables>(CountriesDocument, baseOptions);
      }
export function useCountriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CountriesQuery, CountriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CountriesQuery, CountriesQueryVariables>(CountriesDocument, baseOptions);
        }
export type CountriesQueryHookResult = ReturnType<typeof useCountriesQuery>;
export type CountriesLazyQueryHookResult = ReturnType<typeof useCountriesLazyQuery>;
export type CountriesQueryResult = ApolloReactCommon.QueryResult<CountriesQuery, CountriesQueryVariables>;
export const MyCurrentActivationsDocument = gql`
    query MyCurrentActivations {
  myCurrentActivations {
    ...DisplayActivation
  }
}
    ${DisplayActivationFragmentDoc}`;

/**
 * __useMyCurrentActivationsQuery__
 *
 * To run a query within a React component, call `useMyCurrentActivationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyCurrentActivationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyCurrentActivationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyCurrentActivationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyCurrentActivationsQuery, MyCurrentActivationsQueryVariables>) {
        return ApolloReactHooks.useQuery<MyCurrentActivationsQuery, MyCurrentActivationsQueryVariables>(MyCurrentActivationsDocument, baseOptions);
      }
export function useMyCurrentActivationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyCurrentActivationsQuery, MyCurrentActivationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MyCurrentActivationsQuery, MyCurrentActivationsQueryVariables>(MyCurrentActivationsDocument, baseOptions);
        }
export type MyCurrentActivationsQueryHookResult = ReturnType<typeof useMyCurrentActivationsQuery>;
export type MyCurrentActivationsLazyQueryHookResult = ReturnType<typeof useMyCurrentActivationsLazyQuery>;
export type MyCurrentActivationsQueryResult = ApolloReactCommon.QueryResult<MyCurrentActivationsQuery, MyCurrentActivationsQueryVariables>;
export const CancelActivationDocument = gql`
    mutation CancelActivation($activationId: Int!) {
  cancelActivation(activationId: $activationId) {
    path
    message
  }
}
    `;
export type CancelActivationMutationFn = ApolloReactCommon.MutationFunction<CancelActivationMutation, CancelActivationMutationVariables>;

/**
 * __useCancelActivationMutation__
 *
 * To run a mutation, you first call `useCancelActivationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelActivationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelActivationMutation, { data, loading, error }] = useCancelActivationMutation({
 *   variables: {
 *      activationId: // value for 'activationId'
 *   },
 * });
 */
export function useCancelActivationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CancelActivationMutation, CancelActivationMutationVariables>) {
        return ApolloReactHooks.useMutation<CancelActivationMutation, CancelActivationMutationVariables>(CancelActivationDocument, baseOptions);
      }
export type CancelActivationMutationHookResult = ReturnType<typeof useCancelActivationMutation>;
export type CancelActivationMutationResult = ApolloReactCommon.MutationResult<CancelActivationMutation>;
export type CancelActivationMutationOptions = ApolloReactCommon.BaseMutationOptions<CancelActivationMutation, CancelActivationMutationVariables>;
export const FinishActivationDocument = gql`
    mutation FinishActivation($activationId: Int!) {
  finishActivation(activationId: $activationId) {
    path
    message
  }
}
    `;
export type FinishActivationMutationFn = ApolloReactCommon.MutationFunction<FinishActivationMutation, FinishActivationMutationVariables>;

/**
 * __useFinishActivationMutation__
 *
 * To run a mutation, you first call `useFinishActivationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFinishActivationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [finishActivationMutation, { data, loading, error }] = useFinishActivationMutation({
 *   variables: {
 *      activationId: // value for 'activationId'
 *   },
 * });
 */
export function useFinishActivationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FinishActivationMutation, FinishActivationMutationVariables>) {
        return ApolloReactHooks.useMutation<FinishActivationMutation, FinishActivationMutationVariables>(FinishActivationDocument, baseOptions);
      }
export type FinishActivationMutationHookResult = ReturnType<typeof useFinishActivationMutation>;
export type FinishActivationMutationResult = ApolloReactCommon.MutationResult<FinishActivationMutation>;
export type FinishActivationMutationOptions = ApolloReactCommon.BaseMutationOptions<FinishActivationMutation, FinishActivationMutationVariables>;
export const MakePaymentDocument = gql`
    mutation MakePayment($makePaymentInput: MakePaymentInput!) {
  makePayment(makePaymenInput: $makePaymentInput) {
    orderId
    url
  }
}
    `;
export type MakePaymentMutationFn = ApolloReactCommon.MutationFunction<MakePaymentMutation, MakePaymentMutationVariables>;

/**
 * __useMakePaymentMutation__
 *
 * To run a mutation, you first call `useMakePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makePaymentMutation, { data, loading, error }] = useMakePaymentMutation({
 *   variables: {
 *      makePaymentInput: // value for 'makePaymentInput'
 *   },
 * });
 */
export function useMakePaymentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MakePaymentMutation, MakePaymentMutationVariables>) {
        return ApolloReactHooks.useMutation<MakePaymentMutation, MakePaymentMutationVariables>(MakePaymentDocument, baseOptions);
      }
export type MakePaymentMutationHookResult = ReturnType<typeof useMakePaymentMutation>;
export type MakePaymentMutationResult = ApolloReactCommon.MutationResult<MakePaymentMutation>;
export type MakePaymentMutationOptions = ApolloReactCommon.BaseMutationOptions<MakePaymentMutation, MakePaymentMutationVariables>;
export const MyOrdersDocument = gql`
    query MyOrders {
  myOrders {
    id
    paymentId
    amount
    status
    createdAt
  }
}
    `;

/**
 * __useMyOrdersQuery__
 *
 * To run a query within a React component, call `useMyOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyOrdersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyOrdersQuery, MyOrdersQueryVariables>) {
        return ApolloReactHooks.useQuery<MyOrdersQuery, MyOrdersQueryVariables>(MyOrdersDocument, baseOptions);
      }
export function useMyOrdersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyOrdersQuery, MyOrdersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MyOrdersQuery, MyOrdersQueryVariables>(MyOrdersDocument, baseOptions);
        }
export type MyOrdersQueryHookResult = ReturnType<typeof useMyOrdersQuery>;
export type MyOrdersLazyQueryHookResult = ReturnType<typeof useMyOrdersLazyQuery>;
export type MyOrdersQueryResult = ApolloReactCommon.QueryResult<MyOrdersQuery, MyOrdersQueryVariables>;
export const ServicesDocument = gql`
    query Services($countryCode: String!) {
  services(countryCode: $countryCode) {
    id
    code
    name
    priceAmount
    count
  }
}
    `;

/**
 * __useServicesQuery__
 *
 * To run a query within a React component, call `useServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServicesQuery({
 *   variables: {
 *      countryCode: // value for 'countryCode'
 *   },
 * });
 */
export function useServicesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ServicesQuery, ServicesQueryVariables>) {
        return ApolloReactHooks.useQuery<ServicesQuery, ServicesQueryVariables>(ServicesDocument, baseOptions);
      }
export function useServicesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ServicesQuery, ServicesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ServicesQuery, ServicesQueryVariables>(ServicesDocument, baseOptions);
        }
export type ServicesQueryHookResult = ReturnType<typeof useServicesQuery>;
export type ServicesLazyQueryHookResult = ReturnType<typeof useServicesLazyQuery>;
export type ServicesQueryResult = ApolloReactCommon.QueryResult<ServicesQuery, ServicesQueryVariables>;
export const AllServicesDocument = gql`
    query AllServices {
  allServices {
    code
    name
  }
}
    `;

/**
 * __useAllServicesQuery__
 *
 * To run a query within a React component, call `useAllServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllServicesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllServicesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AllServicesQuery, AllServicesQueryVariables>) {
        return ApolloReactHooks.useQuery<AllServicesQuery, AllServicesQueryVariables>(AllServicesDocument, baseOptions);
      }
export function useAllServicesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AllServicesQuery, AllServicesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AllServicesQuery, AllServicesQueryVariables>(AllServicesDocument, baseOptions);
        }
export type AllServicesQueryHookResult = ReturnType<typeof useAllServicesQuery>;
export type AllServicesLazyQueryHookResult = ReturnType<typeof useAllServicesLazyQuery>;
export type AllServicesQueryResult = ApolloReactCommon.QueryResult<AllServicesQuery, AllServicesQueryVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($resetPassInput: ResetPassInput!) {
  resetPassword(resetPassInput: $resetPassInput) {
    accessAgain
    error {
      path
      message
    }
  }
}
    `;
export type ResetPasswordMutationFn = ApolloReactCommon.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      resetPassInput: // value for 'resetPassInput'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, baseOptions);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = ApolloReactCommon.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($authCredentialsDto: AuthCredentialsDto!) {
  login(authCredentialsDto: $authCredentialsDto) {
    path
    message
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      authCredentialsDto: // value for 'authCredentialsDto'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($userSignupDto: UserSignupDto!) {
  register(userSignupDto: $userSignupDto) {
    result
    errors {
      path
      message
    }
  }
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      userSignupDto: // value for 'userSignupDto'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ResetPasswordConfirmDocument = gql`
    mutation ResetPasswordConfirm($resetPassConfirmInput: ResetPassConfirmInput!) {
  resetPasswordConfirm(resetPassConfirmInput: $resetPassConfirmInput) {
    path
    message
  }
}
    `;
export type ResetPasswordConfirmMutationFn = ApolloReactCommon.MutationFunction<ResetPasswordConfirmMutation, ResetPasswordConfirmMutationVariables>;

/**
 * __useResetPasswordConfirmMutation__
 *
 * To run a mutation, you first call `useResetPasswordConfirmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordConfirmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordConfirmMutation, { data, loading, error }] = useResetPasswordConfirmMutation({
 *   variables: {
 *      resetPassConfirmInput: // value for 'resetPassConfirmInput'
 *   },
 * });
 */
export function useResetPasswordConfirmMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetPasswordConfirmMutation, ResetPasswordConfirmMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetPasswordConfirmMutation, ResetPasswordConfirmMutationVariables>(ResetPasswordConfirmDocument, baseOptions);
      }
export type ResetPasswordConfirmMutationHookResult = ReturnType<typeof useResetPasswordConfirmMutation>;
export type ResetPasswordConfirmMutationResult = ApolloReactCommon.MutationResult<ResetPasswordConfirmMutation>;
export type ResetPasswordConfirmMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetPasswordConfirmMutation, ResetPasswordConfirmMutationVariables>;
export const GetArticlesDocument = gql`
    query GetArticles {
  articles {
    id
    alias
    title
    text
  }
}
    `;

/**
 * __useGetArticlesQuery__
 *
 * To run a query within a React component, call `useGetArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticlesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetArticlesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetArticlesQuery, GetArticlesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, baseOptions);
      }
export function useGetArticlesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetArticlesQuery, GetArticlesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, baseOptions);
        }
export type GetArticlesQueryHookResult = ReturnType<typeof useGetArticlesQuery>;
export type GetArticlesLazyQueryHookResult = ReturnType<typeof useGetArticlesLazyQuery>;
export type GetArticlesQueryResult = ApolloReactCommon.QueryResult<GetArticlesQuery, GetArticlesQueryVariables>;
export const CreateArticleDocument = gql`
    mutation CreateArticle($createArticleDto: CreateArticleDto!) {
  createArticle(createArticleDto: $createArticleDto) {
    path
    message
  }
}
    `;
export type CreateArticleMutationFn = ApolloReactCommon.MutationFunction<CreateArticleMutation, CreateArticleMutationVariables>;

/**
 * __useCreateArticleMutation__
 *
 * To run a mutation, you first call `useCreateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleMutation, { data, loading, error }] = useCreateArticleMutation({
 *   variables: {
 *      createArticleDto: // value for 'createArticleDto'
 *   },
 * });
 */
export function useCreateArticleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateArticleMutation, CreateArticleMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateArticleMutation, CreateArticleMutationVariables>(CreateArticleDocument, baseOptions);
      }
export type CreateArticleMutationHookResult = ReturnType<typeof useCreateArticleMutation>;
export type CreateArticleMutationResult = ApolloReactCommon.MutationResult<CreateArticleMutation>;
export type CreateArticleMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateArticleMutation, CreateArticleMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    balanceAmount
    email
    firstName
    lastName
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const VerifyUserDocument = gql`
    mutation VerifyUser($verifyToken: String!) {
  verifyUser(verifyToken: $verifyToken) {
    path
    message
  }
}
    `;
export type VerifyUserMutationFn = ApolloReactCommon.MutationFunction<VerifyUserMutation, VerifyUserMutationVariables>;

/**
 * __useVerifyUserMutation__
 *
 * To run a mutation, you first call `useVerifyUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyUserMutation, { data, loading, error }] = useVerifyUserMutation({
 *   variables: {
 *      verifyToken: // value for 'verifyToken'
 *   },
 * });
 */
export function useVerifyUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VerifyUserMutation, VerifyUserMutationVariables>) {
        return ApolloReactHooks.useMutation<VerifyUserMutation, VerifyUserMutationVariables>(VerifyUserDocument, baseOptions);
      }
export type VerifyUserMutationHookResult = ReturnType<typeof useVerifyUserMutation>;
export type VerifyUserMutationResult = ApolloReactCommon.MutationResult<VerifyUserMutation>;
export type VerifyUserMutationOptions = ApolloReactCommon.BaseMutationOptions<VerifyUserMutation, VerifyUserMutationVariables>;