import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PCalcService} from "../pcalc.service";

declare var Matter: any;

@Component({
  selector: 'pendilum-animation',
  templateUrl: './pendilum-animation.component.html',
  styleUrls: ['./pendilum-animation.component.css']
})
export class PendilumAnimationComponent implements OnInit {

  lengthsObserver = {
    next: x => {
      console.log('Observer got a next value: ' + x);
      this.animatePendulumsOfLengths(x);
    },
    error: err => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
  };

  constructor(pcalc: PCalcService) {
    pcalc.locations.subscribe(this.lengthsObserver)
  }

  ngOnInit() {
  }

  @ViewChild('renderingArea') renderingArea: ElementRef;

  animatePendulums() {
    this.animatePendulumsOfLengths(Array(0.8, 0.5))
  }

  animatePendulumsOfLengths(lengths:Array<number>) {

    var canvasH = 600;
    var canvasW = 600;

    this.renderingArea.nativeElement.innerHTML = "";
    var Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Composites = Matter.Composites,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      World = Matter.World,
      Constraint = Matter.Constraint,
      Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
      world = engine.world;

    // create renderer
    var render = Render.create({
      element: this.renderingArea.nativeElement,
      engine: engine,
      options: {
        width: canvasW,
        height: canvasH,
        showAngleIndicator: true
      }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);


    World.add(world, [
      // stack,
      // walls
      // Bodies.rectangle(400, 0, 800, 50, {isStatic: true}),
      // Bodies.rectangle(400, 600, 800, 50, {isStatic: true}),
      // Bodies.rectangle(800, 300, 50, 600, {isStatic: true}),
      // Bodies.rectangle(0, 300, 50, 600, {isStatic: true})
    ]);

    function toRadians(angle) {
      return angle * (Math.PI / 180);
    }

    var i;
    var cos30 = Math.cos(toRadians(30));
    var sin30 = Math.sin(toRadians(30));

    var k = canvasH*0.98/(lengths[0])
    for (i = 0; i < lengths.length; i++) {

      var len =  k* lengths[i];
      var x = canvasW/2 - len * sin30
      var y = len * cos30
      var ball = Bodies.circle(x, y, 1, {density: 0.9, frictionAir: 0.000});
      World.add(world, ball);
      World.add(world, Constraint.create({pointA: {x: canvasW/2, y: 10}, bodyB: ball}));
    }


    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: {x: 0, y: 0},
      max: {x: canvasW, y: canvasH}
    });

    // context for MatterTools.Demo
    return {
      engine: engine,
      runner: runner,
      render: render,
      canvas: render.canvas,
      stop: function () {
        Matter.Render.stop(render);
        Matter.Runner.stop(runner);
      }
    };
  };

}
