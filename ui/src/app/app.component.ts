import {Component, Input} from '@angular/core';
import {PCalcService} from "./pcalc.service";

declare var PendilumsCalculator: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pendulum Calculator';

  cmInch=2.54
  cmFt=this.cmInch*12
  cmSixteenth = this.cmInch/16

  @Input() lengthFirst:number = 0.8;
  @Input() numPendilums:number = 16;
  @Input() repeatPeriod:number = 60;
  lengths:Array<number> = []

  constructor( private pcalc:PCalcService){

  }

  keyDownFunction(event) {
    if(event.keyCode == 13) {
      this.calcLengths();
    }
  }

  toImperial( m:number){
    let l = m*100
    let ft = Math.floor( l / this.cmFt )
    let inches =  Math.floor(l/ this.cmInch ) - ft*12
    let sixteenth =  Math.floor((l- ft*this.cmFt-inches* this.cmInch)/ this.cmSixteenth)
    return "" + ft + "' "+ inches + "'' " + sixteenth + "(1/16)"
  }

  calcLengths(){
    this.lengths = PendilumsCalculator.calculatePendilumsLengths( this.numPendilums,this.repeatPeriod, this.lengthFirst) ;
    console.info(this.lengths);
    this.pcalc.locationsSubscriber.next(this.lengths)
  }
}
