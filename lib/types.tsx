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
  transactions: Array<TransactionGqlType>;
  countriesFromApi: Array<CountryApiType>;
  services: Array<ServiceType>;
  prices: Array<PriceType>;
  freeCountries: Array<FreeCountryType>;
  freeNumbers: Array<FreeNumType>;
  freeNumber: FreeNumType;
  freeMessages: FreeMessagesType;
  articles: Array<ArticleType>;
  articlesCount: Scalars['Float'];
  article?: Maybe<ArticleType>;
  myCurrentActivations: Array<ActivationType>;
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
  WriteStubs = 'WriteStubs'
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
};

export type PriceType = {
  __typename?: 'PriceType';
  id: Scalars['Float'];
  amount: Scalars['Float'];
  countryCode: Scalars['String'];
  serviceId: Scalars['Float'];
};

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

export type ActivationType = {
  __typename?: 'ActivationType';
  id: Scalars['Float'];
  status: ActivationStatus;
  phoneNum: Scalars['String'];
  cost: Scalars['Float'];
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

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<Array<ErrorType>>;
  logout: Scalars['Boolean'];
  register: RegisterPayloadType;
  verifyUser?: Maybe<ErrorType>;
  deleteUser?: Maybe<ErrorType>;
  setRole?: Maybe<Array<ErrorType>>;
  createTransaction?: Maybe<Array<ErrorType>>;
  saveService?: Maybe<Array<ErrorType>>;
  deleteService?: Maybe<Array<ErrorType>>;
  restoreService?: Maybe<Array<ErrorType>>;
  saveServicesWithPrices?: Maybe<Array<ErrorType>>;
  savePrice?: Maybe<Array<ErrorType>>;
  createArticle?: Maybe<Array<ErrorType>>;
  updateArticle?: Maybe<Array<ErrorType>>;
  deleteArticle?: Maybe<ErrorType>;
  create100StubActivations?: Maybe<Array<ErrorType>>;
  createStubActivation?: Maybe<Array<ErrorType>>;
  createActivation?: Maybe<Array<ErrorType>>;
  cancelActivation?: Maybe<Array<ErrorType>>;
  finishActivation?: Maybe<Array<ErrorType>>;
  getNumber: ActivationType;
};


export type MutationLoginArgs = {
  authCredentialsDto: AuthCredentialsDto;
};


export type MutationRegisterArgs = {
  userSignupDto: UserSignupDto;
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


export type MutationCreateTransactionArgs = {
  createTransactionDto: CreateTransactionDto;
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


export type MutationCreateArticleArgs = {
  createArticleDto: CreateArticleDto;
};


export type MutationUpdateArticleArgs = {
  updateArticleDto: UpdateArticleDto;
};


export type MutationDeleteArticleArgs = {
  id: Scalars['Float'];
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


export type MutationGetNumberArgs = {
  createActivationInput: CreateActivationInput;
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

export type CreateTransactionDto = {
  amount: Scalars['Float'];
  type: TransactionType;
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

export type CreateActivationInput = {
  serviceCode: Scalars['String'];
  countryCode: Scalars['String'];
};

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
  & Pick<ActivationType, 'id' | 'status' | 'phoneNum' | 'cost' | 'expiresAt'>
);

export type MyCurrentActivationsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyCurrentActivationsQuery = (
  { __typename?: 'Query' }
  & { myCurrentActivations: Array<(
    { __typename?: 'ActivationType' }
    & DisplayActivationFragment
  )> }
);

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

export type ServicesQueryVariables = Exact<{
  countryCode: Scalars['String'];
}>;


export type ServicesQuery = (
  { __typename?: 'Query' }
  & { services: Array<(
    { __typename?: 'ServiceType' }
    & Pick<ServiceType, 'id' | 'code' | 'name' | 'priceAmount'>
  )> }
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
    & Pick<MeResponse, 'balanceAmount' | 'email' | 'firstName' | 'lastName'>
  ) }
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
}
    `;
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
export const ServicesDocument = gql`
    query Services($countryCode: String!) {
  services(countryCode: $countryCode) {
    id
    code
    name
    priceAmount
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