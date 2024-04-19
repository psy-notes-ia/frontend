import { AppFetch } from "./fetch";

class PacientClass {
  private URL_BASE: string;

  constructor() {
    this.URL_BASE = "/pacients";
  }

  async createOne(body: any) {
    var response = await AppFetch(this.URL_BASE + "/", {
      method: "POST",
      body: JSON.stringify(body),
    });
    // const data = await response.json();
    return response;
  }
  async delete(id: string) {
    var response = await AppFetch(this.URL_BASE + "/"+id, {
      method: "DELETE",
    });
    // const data = await response.json();
    return response;
  }
  async getAll() {
    var response = await AppFetch(this.URL_BASE + "/", {
      method: "GET",
    });
    // const data = await response.json();
    return response;
  }
}

var PacientService = new PacientClass();
export default PacientService;
