import Cookie from "js-cookie";
import Router from "next/router";
import jwtDecode from "jwt-decode";
import { NextPageContext } from "next";
import { parseCookie } from "../../utils/parseCookie";

export type DecodedToken = {
  readonly email: string;
  readonly exp: number;
};

const TOKEN_STORAGE_KEY = "myApp.authToken";

export class AuthToken {
  readonly decodedToken: DecodedToken;

  static async storeToken(token: string) {
    Cookie.set(TOKEN_STORAGE_KEY, token);
    await Router.push("/admin");
  }

  static fromNext({ req }: NextPageContext): AuthToken {
    let token = "";
    if (req) {
      token = parseCookie(req.headers.cookie, TOKEN_STORAGE_KEY);
    } else {
      token = Cookie.get(TOKEN_STORAGE_KEY);
    }
    return new AuthToken(token);
  }

  constructor(readonly token?: string) {
    this.decodedToken = { email: "", exp: 0 };

    try {
      if (token) this.decodedToken = jwtDecode(token);
    } catch (e) {}
  }

  get authorizationString() {
    return `Bearer ${this.token}`;
  }

  get expiresAt(): Date {
    return new Date(this.decodedToken.exp * 1000);
  }

  get isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  get isValid(): boolean {
    return !this.isExpired;
  }
}
