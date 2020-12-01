import {Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-translate',
    template: `
        <canvas #translate width="{{canvasWidth}}" height="{{canvasHeight}}"></canvas>
    `,
    styles: ['canvas { border-style: solid }'],
    encapsulation: ViewEncapsulation.None
})
export class TranslateComponent implements OnInit {

    // @ts-ignore
    @ViewChild('translate', {static: true}) canvasTranslateREf: ElementRef<HTMLCanvasElement>;
    // @ts-ignore
    private ctx: CanvasRenderingContext2D;
    private canvasTranslate: HTMLCanvasElement | undefined;

    canvasWidth = 1000;
    canvasHeight = 500;

    position = {
        x: 0,
        y: 0
    };

    speed = {
        x: 6,
        y: 6
    };

    size = 100;

    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
        // @ts-ignore
        this.canvasTranslate.width = this.canvasWidth;
        // @ts-ignore
        this.canvasTranslate.height = this.canvasHeight;
    }

    constructor() {
    }


    ngOnInit(): void {
        // @ts-ignore
        this.canvasTranslate = this.canvasTranslateREf.nativeElement;
        // @ts-ignore
        this.ctx = this.canvasTranslate.getContext('2d');
        requestAnimationFrame(this.draw.bind(this));

    }

    draw(): void {
        this.ctx.clearRect(0, 0, this.canvasTranslate?.width as number, this.canvasTranslate?.height as number);
        this.ctx.fillRect(this.position.x, this.position.y, this.size, this.size);

        // @ts-ignore
        if (this.position.x + this.size > this.canvasTranslate?.width || this.position.x < 0) {
            this.speed.x *= -1;
        }

        // @ts-ignore
        if (this.position.y + this.size > this.canvasTranslate?.height || this.position.y < 0) {
            this.speed.y *= -1;
        }
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        requestAnimationFrame(this.draw.bind(this));

    }

}
