import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-welcome',
    template: `
        <canvas #canvasEmoji width="600" height="300"></canvas>
    `,
    styles: ['canvas { border-style: solid }'],
    encapsulation: ViewEncapsulation.None
})
export class EmojiComponent implements OnInit {

    // @ts-ignore
    @ViewChild('canvasEmoji', {static: true}) canvasEmoji: ElementRef<HTMLCanvasElement>;
    // @ts-ignore
    private ctx: CanvasRenderingContext2D;

    constructor() {
    }


    ngOnInit(): void {
        // @ts-ignore
        this.ctx = this.canvasEmoji.nativeElement.getContext('2d');
        this.renderHappyFace(this.ctx);

    }

    animate(): void {
    }

    renderHappyFace(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
        ctx.moveTo(110, 75);
        ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
        ctx.moveTo(65, 65);
        ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
        ctx.moveTo(95, 65);
        ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
        ctx.stroke();
        ctx.closePath();
    }

}
