import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

export interface Eyes {
    x: number;
    y: number;
    size: number;
    spacing: number;
}

@Component({
    selector: 'app-welcome',
    template: `
        <canvas class="canvas-eyes" #eyes width="{{canvasWidth}}" height="{{canvasHeight}}"></canvas>
    `,
    styles: ['.canvas-eyes { border-style: solid }']
})
export class EyesComponent implements OnInit {

    // @ts-ignore
    @ViewChild('eyes', {static: true}) canvasEyesRef: ElementRef<HTMLCanvasElement>;
    // @ts-ignore
    private context: CanvasRenderingContext2D | null;
    private canvasEyes: HTMLCanvasElement | undefined;


    canvasWidth = 857;
    canvasHeight = 553;


    TAU = Math.PI * 2;

    eyes: Eyes[] = [];

    mousePosition = {
        x: 0,
        y: 0
    };


    ngOnInit(): void {
        // @ts-ignore
        this.canvasEyes = this.canvasEyesRef.nativeElement;
        this.context = this.canvasEyes.getContext('2d');

        this.resizeByCanvasDimensions();

        requestAnimationFrame(this.draw.bind(this));

    }

    resizeByCanvasDimensions(): void {
        // @ts-ignore
        this.canvasEyes.width = this.canvasWidth;
        // @ts-ignore
        this.canvasEyes.height = this.canvasHeight;

    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
        this.resizeByCanvasDimensions();

    }

    @HostListener('click', ['$event.target'])
    onClick(): void {
        const size = this.randomRange(20, 50);
        this.eyes.push({
            x: this.mousePosition.x,
            y: this.mousePosition.y,
            size: this.randomRange(20, 50),
            spacing: size * 0.1
        });

    }

    @HostListener('mousemove', ['$event'])
    onMousemove(event: MouseEvent): void {
        this.mousePosition.x = event.clientX;
        this.mousePosition.y = event.clientY;
    }

    randomRange(min: number, max: number): number {
        return Math.round((Math.random() * (max - min)) + min);
    }

    drawEye(x: number, y: number, eyePair: Eyes): void {

        this.context?.save();

        const deltaX = x - this.mousePosition.x;
        const deltaY = y - this.mousePosition.y;

        const angle = Math.atan2(deltaY, deltaX);

        this.context?.translate(x, y);
        this.context?.rotate(angle);

        this.context?.beginPath();
        this.context?.arc(0, 0, eyePair.size, 0, this.TAU);
        // @ts-ignore
        this.context?.fillStyle = 'white';
        this.context?.stroke();
        this.context?.fill();

        this.context?.beginPath();
        this.context?.arc(-eyePair.size * 0.5, 0, eyePair.size * 0.2, 0, this.TAU);
        // @ts-ignore
        this.context?.fillStyle = 'black';
        this.context?.fill();

        this.context?.restore();
    }

    drawEyes(eyePair: Eyes): void {

        const leftX = eyePair.x - eyePair.size;

        this.drawEye(leftX - eyePair.spacing, eyePair.y, eyePair);

        const rightX = eyePair.x + eyePair.size;

        this.drawEye(rightX + eyePair.spacing, eyePair.y, eyePair);
    }

    draw(): void {
        // @ts-ignore
        this.context?.clearRect(0, 0, this.canvasEyes?.width, this.canvasEyes?.height);

        let i;
        for (i = 0; i < this.eyes.length; i++) {
            this.drawEyes(this.eyes[i]);
        }
        requestAnimationFrame(this.draw.bind(this));
    }


}
