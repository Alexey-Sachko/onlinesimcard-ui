import { NextPageContext } from "next";
import React, { Component } from "react";
import { AuthToken } from "../services/auth/auth.token";
import { isomorphicRedirect } from "../services/redirect/isomorphicRedirect";

export type AuthProps = {
  auth: AuthToken;
};

export function privatePage(WrappedComponent: any) {
  return class PrivatePageHoc extends Component<AuthProps> {
    state = {
      auth: new AuthToken(this.props.auth.token),
    };

    static async getInitialProps(ctx: NextPageContext) {
      // create AuthToken
      const auth = AuthToken.fromNext(ctx);
      const initialProps = { auth };
      // if the token is expired, that means the user is no longer (or never was) authenticated
      // and if we allow the request to continue, they will reach a page they should not be at.
      if (auth.isExpired) {
        isomorphicRedirect("/signin?redirected=true", ctx.res);
      }
      if (WrappedComponent.getInitialProps) {
        const wrappedProps = await WrappedComponent.getInitialProps(
          initialProps
        );
        // make sure our `auth: AuthToken` is always returned
        return { ...wrappedProps, auth };
      }
      return initialProps;
    }

    componentDidMount(): void {
      // since getInitialProps returns our props after they've JSON.stringify
      // we need to reinitialize it as an AuthToken to have the full class
      // with all instance methods available
      this.setState({ auth: new AuthToken(this.props.auth.token) });
    }

    render() {
      // we want to hydrate the WrappedComponent with a full instance method of
      // AuthToken, the existing props.auth is a flattened auth, we want to use
      // the state instance of auth that has been rehydrated in browser after mount
      const { auth, ...propsWithoutAuth } = this.props;
      return <WrappedComponent auth={this.state.auth} {...propsWithoutAuth} />;
    }
  };
}
