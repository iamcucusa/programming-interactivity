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


    ngAfterViewInit(): void {
        this.breakoutCanvas = this.breakoutRef.nativeElement;
        this.context = this.breakoutCanvas.getContext('2d');
        this.print();

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


    print(): void {
        this.context?.beginPath();
        this.context?.rect(20, 40, 50, 50);
        // @ts-ignore
        this.context.fillStyle = '#FF0000';
        this.context?.fill();
        this.context?.closePath();
    }

}
