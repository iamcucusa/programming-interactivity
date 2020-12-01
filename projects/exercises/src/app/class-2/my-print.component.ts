import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';

@Component({
    selector: 'app-my-print-10',
    template: `
        <div>
            <canvas class="my-canvas-print-10" #myPrint width="{{canvasWidth}}" height="{{canvasHeight}}"></canvas>
        </div>
    `,
    styles: ['.my-canvas-print-10 { border-style: solid } .app-my-print-10-reload { margin-bottom: 16px}'],
})
export class MyPrintComponent implements AfterViewInit {

    // @ts-ignore
    @ViewChild('myPrint', {static: true}) myPrintREf: ElementRef<HTMLCanvasElement>;
    // @ts-ignore
    private canvasMyPrint: HTMLCanvasElement | undefined;
    private context: CanvasRenderingContext2D | null | undefined;

    canvasWidth = 450;
    canvasHeight = 450;

    ngAfterViewInit(): void {
        this.canvasMyPrint = this.myPrintREf.nativeElement;
        this.context = this.canvasMyPrint.getContext('2d');
        setInterval(this.print.bind(this), 10);

    }

    sizeCanvas(): void {
        // @ts-ignore
        this.canvasMyPrint.width = this.canvasWidth;
        // @ts-ignore
        this.canvasMyPrint.height = this.canvasHeight;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
        this.sizeCanvas();
    }


    print(): void {

        // @ts-ignore
        const x = Math.random() * this.canvasMyPrint.width;
        // @ts-ignore
        const y = Math.random() * this.canvasMyPrint.height;
        const blue = Math.round(Math.random() * 255);
        this.context?.beginPath();

        // @ts-ignore random shade of pink
        this.context.strokeStyle = `rgb(255,20,${blue})`;

        // @ts-ignore
        this.context.lineWidth = 0.1;

        // @ts-ignore
        this.context?.moveTo(this.canvasMyPrint.width , this.canvasMyPrint.height);
        this.context?.lineTo(x, y);
        this.context?.stroke();


    }

}
