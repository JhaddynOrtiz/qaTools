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
  codeHtml2: any = '';
  crawlerOutput:any;
  processData(): void {
    const updaterList: any[] = [];
    const crawler:any = JSON.parse(this.codeHtml);

    for (const x of crawler) {
      if (!x.Handled) {
        updaterList.push({
          url: x.ProductUrl,
          userData: {
            Manufacturer: x.Manufacturer,
            // Otros datos de usuario si los hubiera
          }
        });
      }
    }
    this.codeHtml2=updaterList;
    console.log(updaterList);
    // Haces algo con updaterList, ya que parece que estás buscando filtrar según la condición y crear una lista.
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
