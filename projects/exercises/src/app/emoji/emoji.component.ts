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


        this.ctx.beginPath();
        this.ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
        this.ctx.moveTo(110, 75);
        this.ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
        this.ctx.moveTo(65, 65);
        this.ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
        this.ctx.moveTo(95, 65);
        this.ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
        this.ctx.stroke();

    }

    animate(): void {}

}
