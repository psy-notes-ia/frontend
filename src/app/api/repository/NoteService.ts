import { AppFetch } from "./fetch";

class NoteServiceClass {
  private URL_BASE: string;

  constructor() {
    this.URL_BASE = "/notes";
  }

  // router.post("/", CreateSmartForm);
  // router.get("/:bid", handler.fetchForms);
  // router.get("/single/:formId", handler.fetchFormById);
  // router.post("/:formId", handler.createFormAnswears);
  // router.patch("/:formId", handler.closeForm);
  // router.patch("/entrances/:shortFormId", handler.incrementFormEntrance);

  FetchSingleFormURL(id: string) {
    return this.URL_BASE + "/" + id;
  }

  FetchAllNotesURL() {
    return this.URL_BASE + "/";
  }

  async createNote(body: any) {
    var response = await AppFetch(this.URL_BASE + "/", {
      method: "POST",
      body: JSON.stringify(body),
    });
    // const data = await response.json();
    return response;
  }

  async searchNoteByQuery(q: string) {
    var response = await AppFetch(this.URL_BASE + "/query/"+q, {
      method: "GET",
    });
    // const data = await response.json();
    return response;
  }

  async fetchAllNotesByPacient(pacientId: string) {
    var response = await AppFetch(this.URL_BASE + "/"+pacientId, {
      method: "GET",
    });
    // const data = await response.json();
    return response;
  }

  async fetchAllNotes() {
    var response = await AppFetch(this.URL_BASE + "/", {
      method: "GET",
    });
    // const data = await response.json();
    return response;
  }

  async fetchAllNotesSession(pacientId: string) {
    var response = await AppFetch(this.URL_BASE + "/sessions/"+pacientId, {
      method: "GET",
    });
    // const data = await response.json();
    return response;
  }

  async updateNote(note: any, id: string) {
    var response = await AppFetch(this.URL_BASE + "/"+id, {
      method: "PATCH",
      body: JSON.stringify({note}),
    });
    // const data = await response.json();
    return response;
  }
  async deleteNote(id: any) {
    var response = await AppFetch(this.URL_BASE + "/"+id, {
      method: "DELETE",
      body:JSON.stringify({"message": ""}),
    });
    // const data = await response.json();
    return response;
  }
}

var NoteService = new NoteServiceClass();
export default NoteService;
