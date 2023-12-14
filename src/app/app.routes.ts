import { Routes } from '@angular/router';
import { VoyageComponent } from './voyage/voyage.component';

export const routes: Routes = [
    {
        path:'voyage',
        component:VoyageComponent
    },{
        path:"",
        pathMatch:'full',
        redirectTo:'voyage'
    }
];
