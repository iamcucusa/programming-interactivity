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
    easeFactor = 0.75;


    mousePosition = {
        x: 0,
        y: 0
    };

    tau = Math.PI * 2;
    baseRadius = 75;
    circles = 60;
    sizeStep = this.baseRadius / this.circles;
    colorVariance = 360 / this.circles;

    positions: { x: number, y: number }[] = [];

    ngOnInit(): void {

        // @ts-ignore
        this.canvasCursor = this.canvasCursorREf.nativeElement;
        // @ts-ignore
        this.ctx = this.canvasCursor.getContext('2d');
        requestAnimationFrame(this.draw.bind(this));

    }

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


    draw(): void {

        let y;
        for (y = 0; y < this.circles; y++) {
            this.positions.push({x: 0, y: 0});
        }

        this.ctx.clearRect(0, 0, this.canvasCursor?.width as number, this.canvasCursor?.height as number);

        let i;
        for (i = 0; i < this.circles; i++) {
            this.positions[i].x += i === 0 ?
                (this.mousePosition.x - this.positions[i].x) * this.easeFactor :
                (this.positions[i - 1].x - this.positions[i].x) * this.easeFactor;
            this.positions[i].y += i === 0 ?
                (this.mousePosition.y - this.positions[i].y) * this.easeFactor :
                (this.positions[i - 1].y - this.positions[i].y) * this.easeFactor;

            this.ctx.beginPath();
            this.ctx.arc(this.positions[i].x, this.positions[i].y, this.baseRadius - (this.sizeStep * i), 0, this.tau);
            this.ctx.strokeStyle = `hsla(${this.colorVariance * i}, 100%, 50%, 1.0)`;
            this.ctx.stroke();

        }

        requestAnimationFrame(this.draw.bind(this));

    }

}
