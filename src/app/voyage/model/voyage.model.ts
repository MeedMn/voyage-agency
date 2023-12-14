export class Voyage{
    nom:string;
    images:string[];
    destination:string;
    prixInitial:number;
    villes:string[];
    nbrPlaces:number;
    date:Date;
    message:string;
    constructor(nom:string,images:string[],destination:string,prixInitial:number,villes:string[],nbrPlaces:number,date:Date){
        this.nom=nom;
        this.images=images;
        this.destination=destination;
        this.prixInitial=prixInitial;
        this.villes=villes;
        this.nbrPlaces=nbrPlaces;
        this.date=date;
        this.message='';
    }
}