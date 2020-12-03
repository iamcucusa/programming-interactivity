import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-welcome',
    template: `
        <canvas class="canvas-proximity" #proximity width="{{canvasWidth}}" height="{{canvasHeight}}"></canvas>
    `,
    styles: ['.canvas-proximity { border-style: solid }']
})
export class ProximityComponent implements OnInit {

    // @ts-ignore
    @ViewChild('proximity', {static: true}) canvasProximityRef: ElementRef<HTMLCanvasElement>;
    // @ts-ignore
    private context: CanvasRenderingContext2D | null;
    private canvasProximity: HTMLCanvasElement | undefined;


    canvasWidth = 857;
    canvasHeight = 553;
    size = 40;
    TAU = Math.PI * 2;

    circles: { x: number, y: number, radius: number }[] = [];
    mousePosition = {
        x: 0,
        y: 0
    };

    ngOnInit(): void {
        // @ts-ignore
        this.canvasProximity = this.canvasProximityRef.nativeElement;
        this.context = this.canvasProximity.getContext('2d');
        this.resizeByCanvasDimensions();
        this.build();
        requestAnimationFrame(this.draw.bind(this));

    }

    resizeByCanvasDimensions(): void {
        // @ts-ignore
        this.canvasProximity.width = this.canvasWidth;
        // @ts-ignore
        this.canvasProximity.height = this.canvasHeight;

    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
        this.resizeByCanvasDimensions();
        this.build();
    }

    @HostListener('mousemove', ['$event'])
    onMousemove(event: MouseEvent): void {
        this.mousePosition.x = event.clientX;
        this.mousePosition.y = event.clientY;
    }

    build(): void {

        // @ts-ignore
        const columns = Math.ceil(this.canvasProximity?.width / this.size) + 1;
        // @ts-ignore
        const rows = Math.ceil(this.canvasProximity?.height / this.size) + 1;

        const amountOfCircles = columns * rows;

        let i;
        let x;
        let y;

        for (i = 0; i < amountOfCircles; i++) {
            x = i % columns;
            y = Math.floor(i / columns);
            this.circles.push({x, y, radius: 2});
        }


    }

    draw(): void {
        // @ts-ignore
        this.context?.clearRect(0, 0, this.canvasProximity?.width, this.canvasProximity?.height);

        let i;
        let circle;
        let sideA;
        let sideB;
        let distance;
        let x;
        let y;
        let maxDistance;
        let growth;

        for (i = 0; i < this.circles.length; i++) {
            circle = this.circles[i];
            x = circle.x * this.size;
            y = circle.y * this.size;
            sideA = x - this.mousePosition.x;
            sideB = y - this.mousePosition.y;
            distance = Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
            // @ts-ignore
            maxDistance = Math.sqrt(Math.pow(this.canvasProximity?.width, 2) + Math.pow(this.canvasProximity?.height, 2));
            growth = this.map(distance, 0, 100, 60, 0);
            if (growth < 0) {
                growth = 0;
            }
            this.context?.beginPath();
            this.context?.arc(x, y, circle.radius + growth, 0, this.TAU);
            this.context?.fill();
        }

        requestAnimationFrame(this.draw.bind(this));
    }

    normalize(value: number, min: number, max: number): number {
        return (value - min) / (max - min);
    }

    interpolate(value: number, min: number, max: number): number {
        return min + (max - min) * value;
    }

    map(value: number, min1: number, max1: number, min2: number, max2: number): number {
        return this.interpolate(this.normalize(value, min1, max1), min2, max2);
    }


}
