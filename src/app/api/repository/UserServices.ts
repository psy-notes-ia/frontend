import { AppFetch } from "./fetch";

class UserServiceClass {
  private URL_BASE: string;

  constructor() {
    this.URL_BASE = "/user";
  }
  async getUserById(): Promise<any> {
    var response = await AppFetch(this.URL_BASE, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((value) => value.json());

    return { data: response, status: response.status };
  }
  async SendStartForm(form: any) {
    var response = await AppFetch(this.URL_BASE + "/start-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    return response;
  }
  FetchIfIsAllowToCreateURL() {
    return this.URL_BASE + "/sub-allowed";
  }
}

var UserService = new UserServiceClass();
export default UserService;
