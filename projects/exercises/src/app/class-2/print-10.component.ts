import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';

@Component({
    selector: 'app-print-10',
    template: `
        <button class="app-print-10-reload" nz-button (click)="print()">Print me again</button>
        <div>
            <canvas class="canvas-print-10" #print10 width="{{canvasWidth}}" height="{{canvasHeight}}"></canvas>
        </div>
    `,
    styles: ['.canvas-print-10 { border-style: solid } .app-print-10-reload { margin-bottom: 16px}'],
})
export class Print10Component implements AfterViewInit {

    // @ts-ignore
    @ViewChild('print10', {static: true}) canvasPrint10REf: ElementRef<HTMLCanvasElement>;
    // @ts-ignore
    private canvasPrint10: HTMLCanvasElement | undefined;
    private context: CanvasRenderingContext2D | null | undefined;

    canvasWidth = 450;
    canvasHeight = 450;

    columns = 15;
    chance = 0.9;

    ngAfterViewInit(): void {
        this.canvasPrint10 = this.canvasPrint10REf.nativeElement;
        this.context = this.canvasPrint10.getContext('2d');
        this.print();

    }

    sizeCanvas(): void {
        // @ts-ignore
        this.canvasPrint10.width = this.canvasWidth;
        // @ts-ignore
        this.canvasPrint10.height = this.canvasHeight;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
        this.sizeCanvas();
        this.print();
    }

    backSlash(x: number, y: number, size: number): void {
        this.context?.beginPath();
        this.context?.moveTo(x, y);
        this.context?.lineTo(x + size, y + size);
        this.context?.stroke();
    }

    forwardSlash(x: number, y: number, size: number): void {

        this.context?.beginPath();
        this.context?.moveTo(x + size, y);
        this.context?.lineTo(x, y + size);
        this.context?.stroke();
    }

    print(): void {


        // @ts-ignore
        this.context.fillStyle = 'cornflowerblue';
        // @ts-ignore
        this.context.fillRect(0, 0, this.canvasPrint10?.width as number, this.canvasPrint10?.height as number);

        const size = this.canvasPrint10?.width as number / this.columns;
        const rows = Math.round(this.canvasPrint10?.height as number / size);

        // @ts-ignore
        this.context.strokeStyle = 'white';
        // @ts-ignore
        this.context.lineWidth = 5;
        // @ts-ignore
        this.context.lineCap = 'square';
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < rows; j++) {
                const rand = Math.random();
                if (rand > this.chance) {
                    this.backSlash(i * size, j * size, size);
                } else {
                    this.forwardSlash(i * size, j * size, size);
                }

            }

        }
    }

}
