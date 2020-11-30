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
    private ctx: CanvasRenderingContext2D | null;

    constructor() {
    }


    ngOnInit(): void {
        this.ctx = this.canvasEmoji.nativeElement.getContext('2d');
    }

    animate(): void {}

}
