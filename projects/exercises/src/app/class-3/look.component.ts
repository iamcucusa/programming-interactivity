import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-welcome',
    template: `
        <canvas class="look-canvas" #look width="{{canvasWidth}}" height="{{canvasHeight}}"></canvas>
    `,
    styles: ['.look-canvas { border-style: solid }']
})
export class LookComponent implements OnInit {

    // @ts-ignore
    @ViewChild('look', {static: true}) canvasLookREf: ElementRef<HTMLCanvasElement>;
    // @ts-ignore
    private canvasLook: HTMLCanvasElement | undefined;
    private context: CanvasRenderingContext2D | undefined;

    canvasWidth = 700;
    canvasHeight = 500;

    mousePosition = {
        x: 0,
        y: 0
    };

    tranglePosition = {
        x: 0,
        y: 0
    };

    triangle = {
        width: 50,
        height: 100
    };

    easeFactor = 0.25;

    resizeByCanvasDimensions(): void {
        // @ts-ignore
        this.canvasLook.width = this.canvasWidth;
        // @ts-ignore
        this.canvasLook.height = this.canvasHeight;

        // @ts-ignore
        this.tranglePosition = {...this.tranglePosition, x: this.canvasLook.width / 2, y: this.canvasLook.height / 2};
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
        this.resizeByCanvasDimensions();
    }


    @HostListener('mousemove', ['$event'])
    onMousemove(event: MouseEvent): void {
        this.mousePosition.x = event.clientX;
        this.mousePosition.y = event.clientY;
    }


    ngOnInit(): void {

        // @ts-ignore
        this.canvasLook = this.canvasLookREf.nativeElement;
        // @ts-ignore
        this.context = this.canvasLook.getContext('2d');
        this.resizeByCanvasDimensions();
        requestAnimationFrame(this.draw.bind(this));


    }

    drawTriangle(width: number, height: number): void {
        this.context?.beginPath();
        this.context?.moveTo(width / 2, 0);
        this.context?.lineTo(width, height);
        this.context?.lineTo(0, height);
        this.context?.closePath();
    }

    draw(): void {
        const deltaX = this.tranglePosition.x - this.mousePosition.x;
        const deltaY = this.tranglePosition.y - this.mousePosition.y;
        const angle = Math.atan2(deltaX, deltaY);


        this.tranglePosition = {
            ...this.tranglePosition,
            x: (this.mousePosition.x - this.tranglePosition.x) * this.easeFactor + this.tranglePosition.x,
            y: (this.mousePosition.y - this.tranglePosition.y) * this.easeFactor + this.tranglePosition.y
        };
        // @ts-ignore
        this.context?.fillStyle = `rgba(256, 256, 256, 0.25)`;
        // @ts-ignore
        this.context?.fillRect(0, 0, this.canvasLook.width, this.canvasLook.height);

        this.context?.save();
        // @ts-ignore
        this.context.translate(this.tranglePosition.x, this.tranglePosition.y);
        this.context?.rotate(-angle);
        this.context?.translate(-this.triangle.width / 2, -this.triangle.height / 2);
        this.drawTriangle(this.triangle.width, this.triangle.height);
        // @ts-ignore
        this.context?.fillStyle = 'black';
        this.context?.fill();
        this.context?.restore();

        requestAnimationFrame(this.draw.bind(this));
    }

}
