export class Reservation {
    voyagename:string;
    fullName: string;
    phoneNumber: string;
    cin: string;
    numberOfSeats: number;
    meal: number;
    prix:number;
    constructor(voyagename:string,fullName:string,phoneNumber:string,cin:string,numberOfSeats:number,prix:number,meal:number){
        this.voyagename=voyagename;
        this.fullName=fullName;
        this.phoneNumber=phoneNumber;
        this.cin=cin;
        this.numberOfSeats=numberOfSeats;
        this.prix=prix;
        this.meal=meal;
    }
  }