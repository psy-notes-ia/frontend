import {AppFetch} from "./fetch";

class AnalyseServiceClass {
  private URL_BASE: string;

  constructor() {
    this.URL_BASE = "/ia";
  }

  async createAnalyse(body: any): Promise<{ data: any; status: any }> {
    var response = await AppFetch(this.URL_BASE + "/analyse/", {
      method: "POST",
      body: JSON.stringify({})
    });

    const data = await response.json();
    return { data: data, status: response.status };
  }

  async checkAnalyseStatus(
    formId: any,
    status: string
  ): Promise<{ data: any; status: any }> {
    var response = await AppFetch(
      this.URL_BASE + "/analyse/" + formId + "/" + status,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    return { data: data, status: response.status };
  }
}

var AnalyseService = new AnalyseServiceClass();
export default AnalyseService;
