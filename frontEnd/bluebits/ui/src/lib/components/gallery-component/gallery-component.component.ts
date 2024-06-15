import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'gallery-component',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule],
  templateUrl: './gallery-component.component.html',
  styleUrl: './gallery-component.component.css',
})
export class GalleryComponentComponent implements OnInit {
  selctedImage?: string;
  @Input() images: any = [];
  ngOnInit(): void {
    setTimeout(() => {
      console.log(this.images.length);
      this.selctedImage = this.images[0];
    }, 1000);
  }
  private laodImges() {
    console.log(this.images.length);
    this.selctedImage = this.images[0];
  }
  changeSelectedImage(img: string) {
    this.selctedImage = img;
  }
}
