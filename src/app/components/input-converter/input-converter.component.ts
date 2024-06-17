import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AuthServiceService } from '../../services/auth-service.service';
import { TaskService } from '../../services/tasks.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-input-converter',
  templateUrl: './input-converter.component.html',
  styleUrls: ['./input-converter.component.css']
})

export class InputConverterComponent implements OnInit {

  jsonModal: string = '';
  jsonData: any = '';

  constructor(
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    public fbAuth: AngularFireAuth,
    private authService: AuthServiceService,
    private taskService: TaskService) {
    this.jsonModal = JSON.stringify(null, null, 2);
  }

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
  crawlerOutput: any;

  urlTask: string = '';
  startUrls: any = '';

  userInfo: any = '';

  processData(): void {
    const updaterList: any[] = [];
    try {
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
      this.jsonModal = JSON.stringify({ "startUrls": this.codeHtml2 }, null, 2);
      // read state user  console.log('state ', this.fbAuth.user);
    } catch (error) {
      Swal.fire({
        title: "Error de formato del JSON",
        text: "Revisa que noexistan caracteres adicionales en el contenido de startUrls",
        icon: "error"
      });
    }


  }

  clearConsole(): void {
    this.codeHtml = '';
    this.codeHtml2 = '';
    this.startUrls = '';
    this.jsonModal = '';
    this.urlTask = '';
  }

  ClearUrl() {
    this.urlTask = '';
  }

  copyToClipboard(text: string) {
    if (text) {
      this.clipboard.copy(JSON.stringify({ "startUrls": text }, null, 2));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Texto copiado",
        showConfirmButton: false,
        timer: 1000
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se encontró el JSON",
        showConfirmButton: false,
        timer: 1000
      });
    }
  }


  showSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000, // Duración del snackbar
    });
  }

  sendRequest() {
    try {
      this.jsonData = JSON.parse(this.jsonModal);
    } catch (error) {
      Swal.fire({
        title: "Error de formato del JSON",
        text: "Revisa que noexistan caracteres adicionales en el contenido de startUrls",
        icon: "error"
      });
    }
    if (!this.urlTask) {
      Swal.fire({
        title: "Agregue la url de la solicitud",
        text: "Debes agregar la url de Run Task",
        icon: "error"
      });
    } else {
      this.taskService.runTaskUpdater(JSON.parse(this.jsonModal), this.urlTask).subscribe(
        (response) => {
          Swal.fire({
            title: "La tarea se envió a ejecutar!",
            text: "Check last run",
            icon: "success"
          });
        },
        error => {
          Swal.fire({
            title: "Ocurrió un problema al realziar la solicitud",
            text: error.message,
            icon: "error"
          });
        }
      )
    }

  }


  ngOnInit() {
    const authUser = this.authService.isAuth();
    this.userInfo = authUser;
    console.log('auth user ', authUser);

  }
}
