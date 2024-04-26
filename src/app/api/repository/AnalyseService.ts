import {AppFetch} from "./fetch";

class AnalyseServiceClass {
  private URL_BASE: string;

  constructor() {
    this.URL_BASE = "/ia";
  }

  async createAnalyse(body: any) {
    var response = await AppFetch(this.URL_BASE + "/analyse/", {
      method: "POST",
      body: JSON.stringify(body)
    });

    return response;
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

  async fetchAllAnalyses(
    pacientId: string,
  ) {
    var response = await AppFetch(
      this.URL_BASE + "/analyse/" + pacientId,
      {
        method: "GET",
      }
    );

    return response;
  }
}

var AnalyseService = new AnalyseServiceClass();
export default AnalyseService;
