import { Injectable } from '@angular/core';
import {Observable, Subscriber} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PCalcService {

  locations:Observable<Array<number>>;

  locationsSubscriber:Subscriber<Array<number>>;

  constructor() {
    this.locations = new Observable( (observer)=>{
      this.locationsSubscriber = observer
    })

  }

  newLengths(vals:Array<number>){
    this.locationsSubscriber.next(vals)
  }

}
