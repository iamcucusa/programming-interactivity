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

    paddleHeight = 10;
    paddleWidth = 75;
    paddleX = (this.canvasWidth - this.paddleWidth) / 2;

    rightPressed = false;
    leftPressed = false;

    interval: unknown| undefined;

    bricks: { x: number, y: number }[][] = [];
    brickRowCount = 3;
    brickColumnCount = 5;
    brickWidth = 75;
    brickHeight = 20;
    brickPadding = 10;
    brickOffsetTop = 30;
    brickOffsetLeft = 30;

    ngAfterViewInit(): void {

        for (let c = 0; c < this.brickColumnCount; c++) {
            // @ts-ignore
            this.bricks[c] = [];
            for (let r = 0; r < this.brickRowCount; r++) {
                // @ts-ignore
                this.bricks[c][r] = {x: 0, y: 0};
            }
        }

        this.breakoutCanvas = this.breakoutRef.nativeElement;
        this.context = this.breakoutCanvas.getContext('2d');
        this.interval = setInterval(this.draw.bind(this), 10);

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

    @HostListener('document:keydown', ['$event'])
    onKeyDownHandler(event: KeyboardEvent): void {
        if (event.key === 'Right' || event.key === 'ArrowRight') {
            this.rightPressed = true;
        } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
            this.leftPressed = true;
        }
    }

    @HostListener('document:keyup', ['$event'])
    onKeyUpHandler(event: KeyboardEvent): void {
        if (event.key === 'Right' || event.key === 'ArrowRight') {
            this.rightPressed = false;
        } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
            this.leftPressed = false;
        }
    }

    drawBall(): void {
        this.context?.beginPath();
        this.context?.arc(this.position.x, this.position.y, this.ballRadius, 0, Math.PI * 2);
        // @ts-ignore
        this.context?.fillStyle = '#0095DD';
        this.context?.fill();
        this.context?.closePath();
    }

    drawPaddle(): void {
        this.context?.beginPath();
        // @ts-ignore
        this.context?.rect(this.paddleX, this.breakoutCanvas?.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
        // @ts-ignore
        this.context?.fillStyle = '#0095DD';
        this.context?.fill();
        this.context?.closePath();
    }

    drawBricks(): void {
        let brickX;
        let brickY;
        for (let c = 0; c < this.brickColumnCount; c++) {
            for (let r = 0; r < this.brickRowCount; r++) {
                brickX = (c * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
                brickY = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
                this.bricks[c][r].x = brickX;
                this.bricks[c][r].y = brickY;
                this.context?.beginPath();
                this.context?.rect(brickX, brickY, this.brickWidth, this.brickHeight);
                // @ts-ignore
                this.context?.fillStyle = '#0095DD';
                this.context?.fill();
                this.context?.closePath();
            }
        }
    }

    draw(): void {
        // @ts-ignore
        this.context?.clearRect(0, 0, this.breakoutCanvas.width, this.breakoutCanvas.height);
        this.drawBricks();
        this.drawBall();
        this.drawPaddle();
        this.position = {...this.position, x: this.position.x + this.dx, y: this.position.y + this.dy};

        // @ts-ignore
        if (this.position.x + this.dx > this.breakoutCanvas?.width - this.ballRadius || this.position.x + this.dx < this.ballRadius) {
            this.dx = -this.dx;
        }

        if (this.position.y + this.dy < this.ballRadius) {
            this.dy = -this.dy;
            // @ts-ignore
        } else if (this.position.y + this.dy > this.breakoutCanvas?.height - this.ballRadius) {
            if (this.position.x > this.paddleX && this.position.x < this.paddleX + this.paddleWidth) {
                this.dy = -this.dy;
            } else {
                alert('GAME OVER');
                document.location.reload();
                // @ts-ignore
                clearInterval(this.interval);
            }
        }

        if (this.rightPressed) {
            this.paddleX += 7;
            // @ts-ignore
            if (this.paddleX + this.paddleWidth > this.breakoutCanvas?.width) {
                // @ts-ignore
                this.paddleX = this.breakoutCanvas?.width - this.paddleWidth;
            }
        } else if (this.leftPressed) {
            this.paddleX -= 7;
            if (this.paddleX < 0) {
                this.paddleX = 0;
            }
        }
    }

}
