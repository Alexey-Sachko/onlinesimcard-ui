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
};

export type Query = {
  __typename?: 'Query';
  me: MeResponse;
  roles: Array<RoleType>;
  allPermissions: Array<Permissions>;
  countriesFromApi: Array<CountryApiType>;
  services: Array<ServiceType>;
  freeCountries: Array<FreeCountryType>;
  freeNumbers: Array<FreeNumType>;
  freeNumber: FreeNumType;
  freeMessages: FreeMessagesType;
  articles: Array<ArticleType>;
  articlesCount: Scalars['Float'];
  article?: Maybe<ArticleType>;
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
  WriteServices = 'WriteServices'
}

export type RoleType = {
  __typename?: 'RoleType';
  id: Scalars['Float'];
  name: Scalars['String'];
  permissions: Array<Permissions>;
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
  prices: Array<PriceType>;
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

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<Array<ErrorType>>;
  logout: Scalars['Boolean'];
  register: RegisterPayloadType;
  verifyUser?: Maybe<ErrorType>;
  deleteUser?: Maybe<ErrorType>;
  setRole?: Maybe<Array<ErrorType>>;
  saveService?: Maybe<Array<ErrorType>>;
  savePrice?: Maybe<Array<ErrorType>>;
  createArticle?: Maybe<Array<ErrorType>>;
  updateArticle?: Maybe<Array<ErrorType>>;
  deleteArticle?: Maybe<ErrorType>;
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
  roleName: Scalars['String'];
};


export type MutationSaveServiceArgs = {
  createServiceDto: CreateServiceDto;
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

export type CreateServiceDto = {
  code: Scalars['String'];
  name: Scalars['String'];
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
    & Pick<MeResponse, 'id' | 'email' | 'firstName' | 'lastName'>
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
    id
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