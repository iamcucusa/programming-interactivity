import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-cursor',
    template: `
        <canvas class="canvas-cursor" #cursor width="{{canvasWidth}}" height="{{canvasHeight}}"></canvas>
    `,
    styles: ['.canvas-cursor { border-style: solid }'],
})
export class CursorComponent implements OnInit {

    // @ts-ignore
    @ViewChild('cursor', {static: true}) canvasCursorREf: ElementRef<HTMLCanvasElement>;
    // @ts-ignore
    private ctx: CanvasRenderingContext2D;
    private canvasCursor: HTMLCanvasElement | undefined;

    canvasWidth = 1000;
    canvasHeight = 500;

    mousePosition = {
        x: 0,
        y: 0
    };

    tau = Math.PI * 2;
    baseRadius = 50;


    position = {
        x: 0,
        y: 0
    };

    speed = {
        x: 6,
        y: 6
    };

    size = 100;
    hue = 300;

    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
        // @ts-ignore
        this.canvasCursor.width = this.canvasWidth;
        // @ts-ignore
        this.canvasCursor.height = this.canvasHeight;
    }

    @HostListener('mousemove', ['$event'])
    onMousemove(event: MouseEvent): void {
        this.mousePosition.x = event.clientX;
        this.mousePosition.y = event.clientY;
    }

    constructor() {
    }


    ngOnInit(): void {
        // @ts-ignore
        this.canvasCursor = this.canvasCursorREf.nativeElement;
        // @ts-ignore
        this.ctx = this.canvasCursor.getContext('2d');
        requestAnimationFrame(this.draw.bind(this));

    }

    draw(): void {

        this.ctx.clearRect(0, 0, this.canvasCursor?.width as number, this.canvasCursor?.height as number);
        this.ctx.beginPath();
        this.ctx.arc(this.mousePosition.x, this.mousePosition.y, this.baseRadius, 0, this.tau);
        this.ctx.stroke();

        requestAnimationFrame(this.draw.bind(this));

    }

}
