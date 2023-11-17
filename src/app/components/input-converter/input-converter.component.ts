import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  selector: 'app-input-converter',
  templateUrl: './input-converter.component.html',
  styleUrls: ['./input-converter.component.css']
})

export class InputConverterComponent {

  constructor(private clipboard: Clipboard, private snackBar: MatSnackBar) {}

  codeEditorOptionsHtml = {
    theme: 'vs-dark',
    language: 'json',
    automaticLayout: true
  };

  showJsonViewer: boolean = false;
  codeHtml: any = '';
  crawlerJson: any = '';
  productName: boolean = false;
  productId: boolean = false;
  codeHtml2: any = '';
  crawlerOutput:any;

  processData(): void {
    const updaterList: any[] = [];
    const crawler:any = JSON.parse(this.codeHtml);

    for (const x of crawler) {
      if (!x.Handled) {
        const newData ={
          url: x.ProductUrl,
          userData: {
            Manufacturer: x.Manufacturer,
            ProductName: this.productName ? x.ProductName : undefined,
            ProductId: this.productId ? x.ProductId : undefined
          }
        }
        updaterList.push(newData);
      }
    }
    this.codeHtml2=updaterList;
  }

  clearConsole(): void{
    this.codeHtml = '';
  }

  copyToClipboard(text: string) {
    
    this.clipboard.copy(JSON.stringify(text, null, 2));
    this.showSnackBar('Texto copiado al portapapeles en formato JSON' + JSON.stringify(text));

  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000, // Duración del snackbar
    });
  }

}
