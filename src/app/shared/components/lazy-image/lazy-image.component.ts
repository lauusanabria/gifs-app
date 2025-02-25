import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css',
})
export class LazyImageComponent implements OnInit {
  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  protected loading: boolean = true;

  ngOnInit(): void {
    if (!this.url) throw new Error('image url is required');
  }

  onLoad() {
    this.loading = false;
  }
}
