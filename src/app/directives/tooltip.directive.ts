import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input('appTooltip') errorMessage!: string;

  private errorElement!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2, private control: NgControl) {}

  ngOnInit(): void {
    this.errorElement = this.renderer.createElement('span');
    this.renderer.addClass(this.errorElement, 'invalid-feedback');
    this.renderer.appendChild(this.el.nativeElement.parentElement, this.errorElement);
    this.renderer.appendChild(this.errorElement, this.renderer.createText(this.errorMessage));

    this.control.statusChanges!.subscribe(status => {
      if (this.control.control!.touched || this.control.control!.dirty) {
        this.updateErrorDisplay(status);
      }
    });

    this.control.control!.valueChanges.subscribe(() => {
      if (this.control.control!.touched || this.control.control!.dirty) {
        this.updateErrorDisplay(this.control.status!);
      }
    });
  }

  private updateErrorDisplay(status: string): void {
    if (status === 'INVALID' && this.control.control!.errors) {
      this.renderer.setStyle(this.errorElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.errorElement, 'display', 'none');
    }
  }
}
