import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FormService } from '../services/form.service';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit {
  @Input('appTooltip') errorMessage!: string;
  @Input() tooltipIndex!: number;

  private tooltipElement!: HTMLElement;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private control: NgControl,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.addClass(this.tooltipElement, 'invalid-feedback');
    this.renderer.appendChild(this.isCustomElement() ? this.el.nativeElement : this.el.nativeElement.parentElement, this.tooltipElement);
    this.renderer.appendChild(this.tooltipElement, this.renderer.createText(this.errorMessage));
  }

  @HostListener('input')
  @HostListener('blur')
  @HostListener('ngModelChange')
  onEvent() {
    this.showTooltip(this.control.control!.invalid && (this.control.control!.touched || this.control.control!.dirty));
  }

  private showTooltip(isShown: boolean): void {
    if (isShown) {
      this.renderer.setStyle(this.tooltipElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.tooltipElement, 'display', 'none');
    }
  }

  private isCustomElement(): boolean {
    return this.el.nativeElement.tagName.toLowerCase().includes('app');
  }
}
