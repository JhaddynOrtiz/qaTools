import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightText'
})
export class HighlightTextPipe implements PipeTransform {

  transform(value: string): string  {
    return value.replace(/INFO/g, '<span class="my-info">INFO</span>')
    .replace(/WARN/g, '<span class="my-warn">WARN</span>')
    .replace(/ERROR/g, '<span class="my-error">ERROR</span>')
    .replace(/[A-Z0-9-:.]{20,}/g, '');
  }

}
