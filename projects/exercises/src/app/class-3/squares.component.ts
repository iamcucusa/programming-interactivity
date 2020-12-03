import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';

@Component({
    selector: 'app-welcome',
    template: `
        <canvas class="look-canvas" #square width="{{canvasWidth}}" height="{{canvasHeight}}"></canvas>
    `,
    styles: ['.look-canvas { border-style: solid }']
})
export class SquaresComponent implements AfterViewInit {

    // @ts-ignore
    @ViewChild('square', {static: true}) canvasSquareREf: ElementRef<HTMLCanvasElement>;
    // @ts-ignore
    private canvasSquare: HTMLCanvasElement | undefined;
    private context: CanvasRenderingContext2D | undefined;

    canvasWidth = 450;
    canvasHeight = 450;

    columns = 10;

    resizeByCanvasDimensions(): void {
        // @ts-ignore
        this.canvasSquare.width = this.canvasWidth;
        // @ts-ignore
        this.canvasSquare.height = this.canvasHeight;

    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
        this.resizeByCanvasDimensions();
    }


    ngAfterViewInit(): void {

        // @ts-ignore
        this.canvasSquare = this.canvasSquareREf.nativeElement;
        // @ts-ignore
        this.context = this.canvasSquare.getContext('2d');
        this.resizeByCanvasDimensions();
        this.draw();


    }

    drawSquare(x: number, y: number, size: number, steps: number, xMovement: number, yMovement: number,
               finalSize: number, initialSteps: number, initialSize: number): void {
        this.context?.beginPath();
        this.context?.rect(x, y, size, size);
        this.context?.stroke();

        if (steps - 1 >= 0) {

            const newSize = initialSize * (steps / initialSteps) + finalSize;

            let newX = x + (size - newSize) / 2;
            let newY = y + (size - newSize) / 2;

            newX = newX - ((x - newX) / (steps + 2)) * xMovement;
            newY = newY - ((y - newY) / (steps + 2)) * yMovement;

            this.drawSquare(newX, newY, newSize, steps - 1, xMovement, yMovement, finalSize, initialSteps, initialSize);
        }
    }

    draw(): void {


        // @ts-ignore
        const lineWidth = this.canvasSquare?.width * 0.01;
        // @ts-ignore
        const size = this.canvasSquare?.width / this.columns;
        // @ts-ignore
        const rows = Math.ceil(this.canvasSquare?.height / size);
        const steps = 10;
        const finalSize = 5;
        const initialSteps = 0;
        const initialSize = size;


        // @ts-ignore
        this.context?.lineWidth = lineWidth;

        let i;
        let j;
        for (i = 0; i < this.columns; i++) {
            for (j = 0; j < rows; j++) {
               // initialSteps = randomRange(5,15);
                this.drawSquare(i * size, j * size, size, initialSteps, 1, 1, finalSize, initialSteps, initialSize);
            }
        }


    }

}
