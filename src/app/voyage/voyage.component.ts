import { Component } from '@angular/core';
import { Voyage } from './model/voyage.model';
import { AppComponent } from '../app.component';
import { MatDialog } from '@angular/material/dialog';
import { ReservationComponent } from '../reservation/reservation.component';
import { BehaviorSubject } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Reservation } from '../reservation/model/reservation.model';

@Component({
  selector: 'app-voyage',
  standalone: true,
  imports: [AppComponent],
  templateUrl: './voyage.component.html',
  styleUrl: './voyage.component.css'
})
export class VoyageComponent {
  voyages = new BehaviorSubject<Voyage[]>(
    [
      new Voyage("voy1",["https://i.pinimg.com/originals/6c/d0/95/6cd09542118db0d6e3806124c2c332ff.jpg","https://cdn-images-1.medium.com/v2/resize:fit:2000/1*yWb3xQSjTgBTghj_cw4Ugw.jpeg","https://i.pinimg.com/originals/6c/d0/95/6cd09542118db0d6e3806124c2c332ff.jpg"],"Ifran",10000,["ifran","fes","azro"],20,new Date(2023,11,13)),
      new Voyage("voy2",["https://i.pinimg.com/originals/6c/d0/95/6cd09542118db0d6e3806124c2c332ff.jpg","https://cdn-images-1.medium.com/v2/resize:fit:2000/1*yWb3xQSjTgBTghj_cw4Ugw.jpeg","https://i.pinimg.com/originals/6c/d0/95/6cd09542118db0d6e3806124c2c332ff.jpg"],"Marrakech",9000,["ifran","fes","azro"],20,new Date(2023,11,13)),
      new Voyage("voy3",["https://i.pinimg.com/originals/6c/d0/95/6cd09542118db0d6e3806124c2c332ff.jpg","https://cdn-images-1.medium.com/v2/resize:fit:2000/1*yWb3xQSjTgBTghj_cw4Ugw.jpeg","https://i.pinimg.com/originals/6c/d0/95/6cd09542118db0d6e3806124c2c332ff.jpg"],"Agadir",5000,["ifran","fes","azro"],20,new Date(2023,1,10)),
      new Voyage("voy4",["https://i.pinimg.com/originals/6c/d0/95/6cd09542118db0d6e3806124c2c332ff.jpg","https://cdn-images-1.medium.com/v2/resize:fit:2000/1*yWb3xQSjTgBTghj_cw4Ugw.jpeg","https://i.pinimg.com/originals/6c/d0/95/6cd09542118db0d6e3806124c2c332ff.jpg"],"Tanger",20000,["ifran","fes","azro"],20,new Date(2023,11,20)),
      new Voyage("voy5",["https://i.pinimg.com/originals/6c/d0/95/6cd09542118db0d6e3806124c2c332ff.jpg","https://cdn-images-1.medium.com/v2/resize:fit:2000/1*yWb3xQSjTgBTghj_cw4Ugw.jpeg","https://i.pinimg.com/originals/6c/d0/95/6cd09542118db0d6e3806124c2c332ff.jpg"],"Ifran",3000,["ifran","fes","azro"],20,new Date(2023,9,1)), 
      new Voyage("voy6",["https://i.pinimg.com/originals/6c/d0/95/6cd09542118db0d6e3806124c2c332ff.jpg","https://cdn-images-1.medium.com/v2/resize:fit:2000/1*yWb3xQSjTgBTghj_cw4Ugw.jpeg","https://i.pinimg.com/originals/6c/d0/95/6cd09542118db0d6e3806124c2c332ff.jpg"],"Ifran",1000,["ifran","fes","azro"],20,new Date(2023,7,17)),
    ]
  );
  reservations=new BehaviorSubject<Reservation[]>([])
  filtered:Voyage[]=this.voyages.getValue();
  maxPrice!:number;
  nbrPlaces!:number;
  range!:number;
  cities:string[]=[];
  date:string='';
  constructor(private dialog: MatDialog,private _snackBar: MatSnackBar){
    this.maxPrice = this.voyages.getValue().reduce((max, voyage) => (voyage.prixInitial > max ? voyage.prixInitial : max), -Infinity);
    this.cities = [...new Set(this.voyages.getValue().map(voyage => voyage.destination))];
  }
  rangePrice(event:any){
    this.range=event.target.value
    if(this.date==''){
      this.filtered = this.voyages.getValue().filter(v=>v.prixInitial<=this.range)
    }else{
      this.filtered=this.filtered.filter(v=>v.prixInitial<=this.range)
    }
  }
  filterByDate(event:any){
    this.filtered = this.voyages.getValue().filter(v=>`${v.date.getFullYear()}-${v.date.getMonth()+1}-${v.date.getDate()}`==event.target.value)
  }
  filterByDestination(event:any){
    const selectedDestination = event.target.value;

    if (selectedDestination === "") {
      this.filtered = this.voyages.getValue();
    } else {
      this.filtered = this.voyages.getValue().filter(voyage => voyage.destination === selectedDestination);
    }
  }
  openReservationDialog(item:Voyage): void {
    console.log("asf : " ,item)
    if(item.nbrPlaces>0){
        const dialogRef = this.dialog.open(ReservationComponent, {
          width: '400px',
          data: {
            voyage:item.nom,
            fullName: '',
            phoneNumber: '',
            cin: '',
            numberOfSeats: item.nbrPlaces,
            room4: false,
            room5: false,
            meal: 0,
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
            item.nbrPlaces-=result.numberOfSeats
            let prix = result.numberOfSeats*item.prixInitial;
            prix = result.room4 ? prix + prix*0.3 : prix;
            prix = result.room5 ? prix + prix*0.2 : prix;
            prix = result.meal>0 ? prix+result.meal*100 : prix;
            prix = prix > 10000 ? prix - prix*0.1 : prix;
            this.reservations.getValue().push(new Reservation(item.nom,result.fullName,result.phoneNumber,result.cin,result.numberOfSeats,prix,result.meal))
            this.reservations.next(this.reservations.getValue())
            console.log(this.reservations.getValue())
        });
    }else{
        this._snackBar.open("No places to reserve","",{duration:3000})
      }
  }
}

