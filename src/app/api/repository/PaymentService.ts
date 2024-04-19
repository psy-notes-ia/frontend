import {AppFetch} from "./fetch";

class PaymentServiceClass {
    private URL_BASE: string;
  
    constructor() {
      this.URL_BASE = "/pay";
    //     process.env.NEXT_PUBLIC_URL_BASE + "/api/payment/plans";
    }
    async goToCheckout(
      price_id: string,
      metadata: any,
      recurring: any
    ){
      var response = await AppFetch(this.URL_BASE + "/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price_id, metadata, recurring }),
      });
  
      // const data = response;
      return response;
    }
  
    async goToStripeCustomerPortal(): Promise<any> {
      var response = await AppFetch(
        this.URL_BASE + "/portal/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const data = await response.json();
      return { data: data, status: response.status };
    }

    // async fetchPlansAndPrices(): Promise<any> {
    //   var response = await fetch(this.BACKEND + "app/plans", {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }).then((value) => value.json());
  
    //   const data = response;
    //   return { data: data, status: response.status };
    // }
    async validPayment(session_id: string) {
      var response = await AppFetch(this.URL_BASE + "/checkout/"+session_id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      return response;
    }
    async fetchPlans() {
      console.log( process.env.NEXT_PUBLIC_BACKEND_URL + "/app/plans")
      var response = await fetch(this.GetPlansURL(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      return response;
    }

    async createFreeAccount( name: string,email: string, price_id:string): Promise<any> {
      var response = await AppFetch(this.URL_BASE + "/start-account/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, price_id, name})
      }).then((value) => value.json());
  
      const data = response;
      return { data: data, status: response.status };
    }

    GetPlansURL(): string { 
   
     return  process.env.NEXT_PUBLIC_BACKEND_URL + "/app/plans";
    }
  }
  
  var PaymentService = new PaymentServiceClass();
  export default PaymentService;
  