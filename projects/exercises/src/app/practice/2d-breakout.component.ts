import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';

@Component({
    selector: 'app-2d-breakout',
    template: `
        <div>
            <canvas class="canvas-2d-breakout" #2dBreakout width="{{canvasWidth}}" height="{{canvasHeight}}"></canvas>
        </div>
    `,
    styles: ['.canvas-2d-breakout{ border-style: solid }'],
})
export class Breakout2DComponent implements AfterViewInit {

    // @ts-ignore
    @ViewChild('2dBreakout', {static: true}) breakoutRef: ElementRef<HTMLCanvasElement>;
    // @ts-ignore
    private breakoutCanvas: HTMLCanvasElement | undefined;
    private context: CanvasRenderingContext2D | null | undefined;

    canvasWidth = 480;
    canvasHeight = 320;

    position = {
        x: this.canvasWidth / 2,
        y: this.canvasHeight - 30
    };

    dx = 2;
    dy = -2;

    ballRadius = 10;

    ngAfterViewInit(): void {
        this.breakoutCanvas = this.breakoutRef.nativeElement;
        this.context = this.breakoutCanvas.getContext('2d');
        setInterval(this.draw.bind(this), 10);

    }

    sizeCanvas(): void {
        // @ts-ignore
        this.breakoutCanvas.width = this.canvasWidth;
        // @ts-ignore
        this.breakoutCanvas.height = this.canvasHeight;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
        this.sizeCanvas();
    }

    drawBall(): void {
        this.context?.beginPath();
        this.context?.arc(this.position.x, this.position.y, this.ballRadius, 0, Math.PI * 2);
        // @ts-ignore
        this.context?.fillStyle = '#0095DD';
        this.context?.fill();
        this.context?.closePath();
    }

    draw(): void {
        // @ts-ignore
        this.context?.clearRect(0, 0, this.breakoutCanvas.width, this.breakoutCanvas.height);
        this.drawBall();
        this.position = {...this.position, x: this.position.x + this.dx, y: this.position.y + this.dy};

        // @ts-ignore
        if (this.position.x + this.dx > this.breakoutCanvas?.width - this.ballRadius || this.position.x + this.dx < this.ballRadius) {
            this.dx = -this.dx;
        }
        // @ts-ignore
        if (this.position.y + this.dy > this.breakoutCanvas?.height - this.ballRadius || this.position.y + this.dy < this.ballRadius) {
            this.dy = -this.dy;
        }
    }

}
