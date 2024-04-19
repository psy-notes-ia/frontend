
class AuthenticationServiceClass {
  private URL_BASE: string;

  constructor() {
    this.URL_BASE = (process.env.NEXT_PUBLIC_BACKEND_URL as string) + "/app";
  }

  async SignIn(email: string, password: string) {
    var response = await fetch(this.URL_BASE + "/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    return response;
  }

  async SignUp(data:any) {
    var response = await fetch(this.URL_BASE + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response;
  }
  // async SignUpAndCreateFreePlan(data:any) {
  //   var response = await fetch(this.URL_BASE + "/signup?p=true", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   const res = await response.json();
  //   return { data: res, status: response.status };
  // }

  async SendForgotPasswordEmail(email: string) {
    const res = await fetch(this.URL_BASE + "/forgot/" + email, { method: "POST" });

    const data = await res.json();
    return { data: data, status: res.status };
  }

  async ResetPassword(uid: string, password: string) {
    const res = await fetch(this.URL_BASE + "/reset-pass/" + uid, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });
    return { data: {}, status: res.status };
  }

  GetCheckResetPasswordTokenURL(
    uid: any,
    token: string
  ): string {

    return this.URL_BASE + "/forgot?wtk=" + token + "&uid=" + uid;

  }
}

const AuthenticationService = new AuthenticationServiceClass();

export default AuthenticationService;
