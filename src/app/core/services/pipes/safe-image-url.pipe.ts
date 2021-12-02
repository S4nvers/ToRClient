import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeImageURL'
})
export class SafeImageURLPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, ...args: unknown[]): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

}
