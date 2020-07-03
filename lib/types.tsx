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
  freeCountries: Array<FreeCountryType>;
  freeNumbers: Array<FreeNumType>;
  freeNumber: FreeNumType;
  freeMessages: FreeMessagesType;
  articles: Array<ArticleType>;
  articlesCount: Scalars['Float'];
  article: ArticleType;
};


export type QueryFreeNumberArgs = {
  num: Scalars['String'];
};


export type QueryFreeMessagesArgs = {
  page?: Maybe<Scalars['Int']>;
  number: Scalars['String'];
};


export type QueryArticleArgs = {
  alias: Scalars['String'];
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
  createArticle: ArticleType;
};


export type MutationCreateArticleArgs = {
  createArticleDto: CreateArticleDto;
};

export type CreateArticleDto = {
  alias: Scalars['String'];
  title: Scalars['String'];
  text: Scalars['String'];
};

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
  & { createArticle: (
    { __typename?: 'ArticleType' }
    & Pick<ArticleType, 'id' | 'alias' | 'title' | 'text'>
  ) }
);


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
    id
    alias
    title
    text
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