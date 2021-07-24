import Config from "../util/config";

class DrinkService {

  constructor() {    
    this.config = new Config();
    
  }

  async getAll(keyword) {
    console.log("Calling http request - DrinkService.getAll()")

    const response = await fetch(this.config.DRINK_COLLECTION_URL+'?search='+keyword);
    if(!response.ok){
      this.ErrorHandler(response);
      return null;
    }

    return await response.json();
  }  

  async getByLetter(keyword) {
    console.log("Calling http request - DrinkService.getByLetter()")

    const response = await fetch(this.config.DRINK_COLLECTION_URL+'/letter?l='+keyword);
    if(!response.ok){
      this.ErrorHandler(response);
      return null;
    }

    return await response.json();
  } 

  async getById(id) {
    console.log("Calling http request - DrinkService.getgetByIdAll()")

    const response = await fetch(this.config.DRINK_COLLECTION_URL+'/'+id);
    if(!response.ok){
      this.ErrorHandler(response);
      return null;
    }

    return await response.json();
  }  


  ErrorHandler(response) {
    throw new Error("HTTP request error - status: " + response.status);
  }
}
 
export default DrinkService;


