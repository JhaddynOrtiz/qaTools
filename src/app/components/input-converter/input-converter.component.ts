import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
@Component({
  selector: 'app-input-converter',
  templateUrl: './input-converter.component.html',
  styleUrls: ['./input-converter.component.css']
})

export class InputConverterComponent implements OnInit {

  constructor(private clipboard: Clipboard, private snackBar: MatSnackBar, public fbAuth: AngularFireAuth) { }

  codeEditorOptionsHtml = {
    theme: 'vs-dark',
    language: 'json',
    automaticLayout: true
  };

  emailUser: string = '';
  showJsonViewer: boolean = false;
  codeHtml: any = '';
  crawlerJson: any = '';
  productName: boolean = false;
  productId: boolean = false;
  codeHtml2: any = '';
  crawlerOutput: any;

  processData(): void {
    const updaterList: any[] = [];
    const crawler: any = JSON.parse(this.codeHtml);

    for (const x of crawler) {
      if (!x.Handled) {
        const newData = {
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
    this.codeHtml2 = updaterList;
    console.log('state ', this.fbAuth.user);
  }

  clearConsole(): void {
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

  isAuth() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        const email = user.email;
        this.emailUser = email ? email : '';
        console.log('user ', uid, ' => ', email);

        // ...
      } else {
        // User is signed out
        console.log('Not user');

        // ...
      }
    });
  }

  ngOnInit() {
    this.isAuth();
  }

}
