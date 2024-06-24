import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AuthServiceService } from '../../services/auth-service.service';
import { TaskService } from '../../services/tasks.service';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-input-converter',
  templateUrl: './input-converter.component.html',
  styleUrls: ['./input-converter.component.css']
})

export class InputConverterComponent implements OnInit, OnDestroy {

  jsonModal: string = '';
  jsonData: any = '';

  private modalRef!: NgbModalRef;

  constructor(
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    public fbAuth: AngularFireAuth,
    private authService: AuthServiceService,
    private taskService: TaskService,
    private modalService: NgbModal) {
    this.jsonModal = JSON.stringify(null, null, 2);
  }

  codeEditorOptionsHtml = {
    theme: 'vs-dark',
    language: 'json',
    automaticLayout: true
  };


  showJsonViewer: boolean = false;
  codeHtml: any = `[{
  "ProductId": "TFPH-024",
  "Manufacturer": "Philips",
  "ProductName": "Philips 499P9H/00, 124 cm (48,8 Zoll), 4K/UHD, VA - DP, HDMI, USB-C",
  "ProductUrl": "https://www.caseking.de/philips-499p9h-00-124-cm-48.8-inches-4k-uhd-va-dp-hdmi-usb-c/TFPH-024.html",
  "Price": 928.9,
  "ImageUri": "https://www.caseking.de/dw/image/v2/BKRR_PRD/on/demandware.static/-/Sites-master-catalog-caseking/default/dw3af4c893/images/pim/TFPH/TFPH-024/TFPH-024_dff527d3aca2d419d99293258f329d754a1a0f1c.jpg?sw=200",
  "CTINCode": "499P9H/00",
  "EANCode": "8712581753719"
},
{
  "ProductId": "TFPH-069",
  "Manufacturer": "Philips",
  "ProductName": "Philips Evnia 5000 32M2C5500W, 80 cm (31,5 Zoll) Curved, 240Hz, FreeSync, VA - 2xDP, 2xHDMI, USB",
  "ProductUrl": "https://www.caseking.de/philips-evnia-5000-32m2c5500w-80-cm-31.5-inches-curved-240hz-freesync-va-2xdp-2xhdmi-usb/TFPH-069.html",
  "Price": 429.9,
  "ImageUri": "https://www.caseking.de/dw/image/v2/BKRR_PRD/on/demandware.static/-/Sites-master-catalog-caseking/default/dwa2227064/images/pim/TFPH/TFPH-069/TFPH-069_30f39b55b25138ca93df1eec419d64b6bf97de57.jpg?sw=200",
  "CTINCode": "32M2C5500W/00",
  "EANCode": "8712581799564"
},
{
  "ProductId": "TFPH-073",
  "Manufacturer": "Philips",
  "ProductName": "Philips 5000 Series 49B2U5900CH, 124 cm (48,8 Zoll) 75Hz, Adaptive Sync, VA - DP, 2xHDMI",
  "ProductUrl": "https://www.caseking.de/philips-5000-series-49b2u5900ch-124-cm-48.8-inches-75hz-adaptive-sync-va-dp-2xhdmi/TFPH-073.html",
  "Price": 958.9,
  "ImageUri": "https://www.caseking.de/dw/image/v2/BKRR_PRD/on/demandware.static/-/Sites-master-catalog-caseking/default/dw94cf7ec3/images/pim/TFPH/TFPH-073/TFPH-073_64a6bed96b400aaf45736ddda0520a333858ab86.jpg?sw=200",
  "CTINCode": "49B2U5900CH/00",
  "EANCode": "8712581802578"
},
{
  "ProductId": "TFPH-049",
  "Manufacturer": "Philips",
  "ProductName": "Philips 27M1N3200VS LCD-Monitor, 68,5 cm (27 Zoll), 165 Hz, VA-Panel, HDMI/DP",
  "ProductUrl": "https://www.caseking.de/philips-27m1n3200vs-lcd-monitor-68.5-cm-27-inches-165-hz-va-panel-hdmi-dp/TFPH-049.html",
  "Price": 164.9,
  "ImageUri": "https://www.caseking.de/dw/image/v2/BKRR_PRD/on/demandware.static/-/Sites-master-catalog-caseking/default/dw5b764596/images/pim/TFPH/TFPH-049/TFPH-049_2cf3cc53cd78b01489ee79a80bc621dd8ea33bc8.jpg?sw=200",
  "CTINCode": "27M1N3200VS/00",
  "EANCode": "8712581782054"
},
{
  "ProductId": "TFPH-056",
  "Manufacturer": "Philips",
  "ProductName": "Philips Momentum 5000 27M1C5500VL, 68,6 cm (27 Zoll), Curved, 165Hz, Adaptive Sync, VA - DP, 2xHDMI",
  "ProductUrl": "https://www.caseking.de/philips-momentum-5000-27m1c5500vl-68.6-cm-27-inches-curved-165hz-adaptive-sync-va-dp-2xhdmi/TFPH-056.html",
  "Price": 198.9,
  "ImageUri": "https://www.caseking.de/dw/image/v2/BKRR_PRD/on/demandware.static/-/Sites-master-catalog-caseking/default/dwdeebb772/images/pim/TFPH/TFPH-056/TFPH-056_e5ba8df3346a8d261a9e7a8e65fe89a91260d684.jpg?sw=200",
  "CTINCode": "27M1C5500VL/00",
  "EANCode": "8712581796006"
},
{
  "ProductId": "TFPH-072",
  "Manufacturer": "Philips",
  "ProductName": "Philips Evnia 5000 32M1C5200W, 80 cm (31,5 Zoll) Curved, 240Hz, FreeSync, VA - DP, 2xHDMI",
  "ProductUrl": "https://www.caseking.de/philips-evnia-5000-32m1c5200w-80-cm-31.5-inches-curved-240hz-freesync-va-dp-2xhdmi/TFPH-072.html",
  "Price": 228.9,
  "ImageUri": "https://www.caseking.de/dw/image/v2/BKRR_PRD/on/demandware.static/-/Sites-master-catalog-caseking/default/dw1ceffe1e/images/pim/TFPH/TFPH-072/TFPH-072_2401fc49fa2ac90ffa0605b1002d65f1606f0e7a.jpg?sw=200",
  "CTINCode": "32M1C5200W/00",
  "EANCode": "8712581800710"
},
{
  "ProductId": "TFPH-058",
  "Manufacturer": "Philips",
  "ProductName": "Philips Momentum 5000 27M1F5500P, 68,5 cm (27 Zoll) 240Hz, Adaptive Sync, IPS - 2xDP, 2xHDMI",
  "ProductUrl": "https://www.caseking.de/philips-momentum-5000-27m1f5500p-68.5-cm-27-inches-240hz-adaptive-sync-ips-2xdp-2xhdmi/TFPH-058.html",
  "Price": 433.9,
  "ImageUri": "https://www.caseking.de/dw/image/v2/BKRR_PRD/on/demandware.static/-/Sites-master-catalog-caseking/default/dwdbcdd7bd/images/pim/TFPH/TFPH-058/TFPH-058_181194ffaea3803e399d0cea7347e57a398fcd5e.jpg?sw=200",
  "CTINCode": "27M1F5500P/00",
  "EANCode": "8712581795900"
},
{
  "ProductId": "TFPH-057",
  "Manufacturer": "Philips",
  "ProductName": "Philips Momentum 5000 27M1F5800, 68,5 cm (27 Zoll), 144Hz, Adaptive Sync, IPS - 2xDP, 2xHDMI",
  "ProductUrl": "https://www.caseking.de/philips-momentum-5000-27m1f5800-68.5-cm-27-inches-144hz-adaptive-sync-ips-2xdp-2xhdmi/TFPH-057.html",
  "Price": 499,
  "ImageUri": "https://www.caseking.de/dw/image/v2/BKRR_PRD/on/demandware.static/-/Sites-master-catalog-caseking/default/dw27c30964/images/pim/TFPH/TFPH-057/TFPH-057_1fbed962a58ce88fd5e8fb2a58cf4f9ba5a3c1af.jpg?sw=200",
  "CTINCode": "27M1F5800/00",
  "EANCode": "8712581795924"
},
{
  "ProductId": "TFPH-070",
  "Manufacturer": "Philips",
  "ProductName": "Philips Evnia 3000 25M2N3200W, 62,2 cm (24,5 Zoll) 240Hz, Adaptive Sync, VA - DP, 2xHDMI",
  "ProductUrl": "https://www.caseking.de/philips-evnia-3000-25m2n3200w-62.2-cm-24.5-inches-240hz-adaptive-sync-va-dp-2xhdmi/TFPH-070.html",
  "Price": 169,
  "ImageUri": "https://www.caseking.de/dw/image/v2/BKRR_PRD/on/demandware.static/-/Sites-master-catalog-caseking/default/dw100636ea/images/pim/TFPH/TFPH-070/TFPH-070_ad115acf7d8171fbedeeb44873d7f3e9f2b57d84.jpg?sw=200",
  "CTINCode": "25M2N3200W/00",
  "EANCode": "8712581800673"
},
{
  "ProductId": "TFPH-066",
  "Manufacturer": "Philips",
  "ProductName": "Philips Evnia 8000 34M2C8600, 86,4 cm (34 Zoll), Curved, 175Hz, FreeSync, QD-OLED - DP, 2xHDMI",
  "ProductUrl": "https://www.caseking.de/philips-evnia-8000-34m2c8600-86.4-cm-34-inches-curved-175hz-freesync-qd-oled-dp-2xhdmi/TFPH-066.html",
  "Price": 799,
  "ImageUri": "https://www.caseking.de/dw/image/v2/BKRR_PRD/on/demandware.static/-/Sites-master-catalog-caseking/default/dw58ca6c87/images/pim/TFPH/TFPH-066/TFPH-066_bfc283aa7998ae5dcdfb8f27d7ed190b4b0d4a10.jpg?sw=200",
  "CTINCode": "34M2C8600/00",
  "EANCode": "8712581798680"
},
{
  "ProductId": "TFPH-044",
  "Manufacturer": "Philips",
  "ProductName": "Philips 243S1 LCD-Monitor, 60,5 cm (23,8 Zoll), 75 Hz, IPS, HDMI/DP/USB-C",
  "ProductUrl": "https://www.caseking.de/philips-243s1-lcd-monitor-60.5-cm-23.8-inches-75-hz-ips-hdmi-dp-usb-c/TFPH-044.html",
  "Price": 189.9,
  "ImageUri": "https://www.caseking.de/dw/image/v2/BKRR_PRD/on/demandware.static/-/Sites-master-catalog-caseking/default/dw982f551a/images/pim/TFPH/TFPH-044/TFPH-044_59ced44dac74dae2eff89dff7651f54fe844a3f4.jpg?sw=200",
  "CTINCode": "243S1/00",
  "EANCode": "8712581784744"
},
{
  "ProductId": "TFPH-059",
  "Manufacturer": "Philips",
  "ProductName": "Philips Momentum 5000 32M1C5500VL, 80 cm (31,5 Zoll), Curved, 165Hz, Adaptive Sync, VA - DP, HDMI",
  "ProductUrl": "https://www.caseking.de/philips-momentum-5000-32m1c5500vl-80-cm-31.5-inches-curved-165hz-adaptive-sync-va-dp-hdmi/TFPH-059.html",
  "Price": 243.9,
  "ImageUri": "https://www.caseking.de/dw/image/v2/BKRR_PRD/on/demandware.static/-/Sites-master-catalog-caseking/default/dwe05a4be5/images/pim/TFPH/TFPH-059/TFPH-059_3994987224ae22281dee378ce75bbabb85b3698c.jpg?sw=200",
  "CTINCode": "32M1C5500VL/00",
  "EANCode": "8712581795962"
},
{
  "ProductId": "TFPH-063",
  "Manufacturer": "Philips",
  "ProductName": "Philips UltraWide 5000 40B1U5600, 100,4 cm (39,53 Zoll), 120Hz, Adaptive Sync, IPS - DP, HDMI",
  "ProductUrl": "https://www.caseking.de/philips-ultrawide-5000-40b1u5600-100.4-cm-39.53-inches-120hz-adaptive-sync-ips-dp-hdmi/TFPH-063.html",
  "Price": 525.9,
  "ImageUri": "https://www.caseking.de/dw/image/v2/BKRR_PRD/on/demandware.static/-/Sites-master-catalog-caseking/default/dwe648c7a6/images/pim/TFPH/TFPH-063/TFPH-063_924b2da94dbaf553810f5423166ffe4e6ef1550b.jpg?sw=200",
  "CTINCode": "40B1U5600/00",
  "EANCode": "8712581797478"
},
{
  "ProductId": "TFPH-071",
  "Manufacturer": "Philips",
  "ProductName": "Philips Evnia 5000 27M1C5200W, 68,6 cm (27 Zoll) 240Hz, Adaptive Sync, VA - DP, 2xHDMI",
  "ProductUrl": "https://www.caseking.de/philips-evnia-5000-27m1c5200w-68.6-cm-27-inch-240hz-adaptive-sync-va-dp-2xhdmi/TFPH-071.html",
  "Price": 189.9,
  "ImageUri": "https://www.caseking.de/dw/image/v2/BKRR_PRD/on/demandware.static/-/Sites-master-catalog-caseking/default/dw72237ccb/images/pim/TFPH/TFPH-071/TFPH-071_dae22aa6ec700d55cad1d96f068d850573ce1ae5.jpg?sw=200",
  "CTINCode": "27M1C5200W/00",
  "EANCode": "8712581800697"
},
{
  "ProductId": "TFPH-068",
  "Manufacturer": "Philips",
  "ProductName": "Philips Evnia 49M2C8900, 124,46 cm (49 Zoll) 240Hz, Adaptive-Sync, QD OLED - DP, HDMI",
  "ProductUrl": "https://www.caseking.de/philips-evnia-49m2c8900-124.46-cm-49-inches-240hz-adaptive-sync-qd-oled-dp-hdmi/TFPH-068.html",
  "Price": 1169,
  "ImageUri": "https://www.caseking.de/dw/image/v2/BKRR_PRD/on/demandware.static/-/Sites-master-catalog-caseking/default/dwa5405cea/images/pim/TFPH/TFPH-068/TFPH-068_9fac67672cc4c8453a7b9d961447fb92e09a9fa7.jpg?sw=200",
  "CTINCode": "49M2C8900/00",
  "EANCode": "8712581801663"
},
{
  "ProductId": "TFPH-060",
  "Manufacturer": "Philips",
  "ProductName": "Philips Momentum 5000 34M1C5500VA, 86,36 cm (34 Zoll), Curved, 165Hz, FreeSync, VA - 2xDP, 2xHDMI",
  "ProductUrl": "https://www.caseking.de/philips-momentum-5000-34m1c5500va-86.36-cm-34-inches-curved-165hz-freesync-va-2xdp-2xhdmi/TFPH-060.html",
  "Price": 342.9,
  "ImageUri": "https://www.caseking.de/dw/image/v2/BKRR_PRD/on/demandware.static/-/Sites-master-catalog-caseking/default/dwef0713b7/images/pim/TFPH/TFPH-060/TFPH-060_912d8d6da2caae63f6ca559ce31ae908dbd9e450.jpg?sw=200",
  "CTINCode": "34M1C5500VA/00",
  "EANCode": "8712581795986"
},
{
  "ProductId": "TFPH-054",
  "Manufacturer": "Philips",
  "ProductName": "Philips Evnia 5000 27M2C5500W, 68,6 cm (27 Zoll), Curved, 240Hz, FreeSync, 2xDp, 2xHDMI",
  "ProductUrl": "https://www.caseking.de/philips-evnia-5000-27m2c5500w-68.6-cm-27-inches-curved-240hz-freesync-2xdp-2xhdmi/TFPH-054.html",
  "Price": 371.9,
  "ImageUri": "https://www.caseking.de/dw/image/v2/BKRR_PRD/on/demandware.static/-/Sites-master-catalog-caseking/default/dw8cbc2742/images/pim/TFPH/TFPH-054/TFPH-054_3bf86d2149ec3b4df9ffb885fd384de35d27f44b.jpg?sw=200",
  "CTINCode": "27M2C5500W",
  "EANCode": "8712581799540"
},
{
  "ProductId": "TFPH-051",
  "Manufacturer": "Philips",
  "ProductName": "Philips 32M1N5800A LCD-Monitor, 80 cm (31,5 Zoll), 144 Hz, IPS-Panel, HDMI/DP",
  "ProductUrl": "https://www.caseking.de/philips-32m1n5800a-lcd-monitor-80-cm-31.5-inches-144-hz-ips-panel-hdmi-dp/TFPH-051.html",
  "Price": 729.9,
  "ImageUri": "https://www.caseking.de/dw/image/v2/BKRR_PRD/on/demandware.static/-/Sites-master-catalog-caseking/default/dw579950ce/images/pim/TFPH/TFPH-051/TFPH-051_1572e021cc5492c22cff85abc545b6251a8cbd1e.jpg?sw=200",
  "CTINCode": "32M1N5800A/00",
  "EANCode": "8712581781064"
},
{
  "ProductId": "TFPH-062",
  "Manufacturer": "Philips",
  "ProductName": "Philips UltraWide 5000 40B1U5601H, 100,4 cm (39,53 Zoll), 120Hz, IPS - DP, HDMI",
  "ProductUrl": "https://www.caseking.de/philips-ultrawide-5000-40b1u5601h-100.4-cm-39.53-inches-120hz-ips-dp-hdmi/TFPH-062.html",
  "Price": 539,
  "ImageUri": "https://www.caseking.de/dw/image/v2/BKRR_PRD/on/demandware.static/-/Sites-master-catalog-caseking/default/dw88d9bd84/images/pim/TFPH/TFPH-062/TFPH-062_33652606a701b7b6156028a334d71c42dbd0d13f.jpg?sw=200",
  "CTINCode": "40B1U5601H/00",
  "EANCode": "8712581797492"
}]`;
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

  openModal(content: any) {
    this.modalRef = this.modalService.open(content, { centered: true, windowClass: 'custom-modal' });
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
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
          this.closeModal();
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

  ngOnDestroy(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  ngOnInit() {
    const authUser = this.authService.isAuth();
    this.userInfo = authUser;
    console.log('auth user ', authUser);
  }
}
