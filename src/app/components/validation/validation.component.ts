import { Component, OnDestroy } from '@angular/core';
import { TaskService } from '../../services/tasks.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApifyService } from 'src/app/services/apify.service';

import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnDestroy {

  /* idTask: string = '';
  typeRobot: string = '';
  manufacturerCode: string = '';
  productUrl: string = '';
  imageUri: string = '';
  cultureCode: string = ''; */

  taskId = 'XETtJl5o4ddH0I1Sg'; // ID de la tarea de Apify
  runId!: string;
  logs: any = '';

  logSubscription: any = new Subscription;

  form: FormGroup;

  /* constructor(private taskService: TaskService, private apifyService: ApifyService) {
    this.form = new FormGroup({
      idTask: new FormControl('',),
      typeRobot: new FormControl('crawler',),
      manufacturerCode: new FormControl('',),
      productUrl: new FormControl('',),
      imageUri: new FormControl('',),
      cultureCode: new FormControl('',)
    });
  } */
  constructor(private taskService: TaskService, private apifyService: ApifyService) {
    this.form = new FormGroup({
      idTask: new FormControl('', [Validators.required]),
      typeRobot: new FormControl('crawler', [Validators.required]),
      manufacturerCode: new FormControl('', [Validators.required]),
      productUrl: new FormControl('', [Validators.required, Validators.pattern('https?://.+')]),
      imageUri: new FormControl('', [Validators.pattern('https?://.+')]),
      cultureCode: new FormControl('', [Validators.required])
    });
  }

  /* runTask() {
    this.apifyService.runTask(this.taskId).subscribe(response => {
      if (response.data && response.data.id) {
        this.runId = response.data.id;
        this.startLogPolling();
      } else {
        console.error('Error running task:', response);
      }
    }, error => {
      console.error('Error running task:', error);
    });
  } */

  startLogPolling() {
    this.logs = null;
    if (this.logSubscription) {
      this.logSubscription.unsubscribe();
    }

    this.logSubscription = interval(5000).pipe(
      switchMap(() => this.apifyService.getTaskRunResults(this.runId))
    ).subscribe(response => {
      this.logs = response;
      console.log("here", this.logs);
      if (this.logs.includes('QA Validation Complete')) {
        this.stopLogPolling();
      }
    }, error => {
      console.error('Error getting logs:', error);
    });
  }

  stopLogPolling() {
    if (this.logSubscription) {
      this.logSubscription.unsubscribe(); // Cleanup the subscription
      this.logSubscription = null;
      console.log('Log polling stopped.');
    }
  }

  sendValidation() {
    const body = {
      "CheckDuplicates": {
        "ProductUrl": true,
        "ProductName": true,
        "ProductId": true
      },
      "CheckMappingCodes": true,
      "CultureCode": this.form.value.cultureCode,
      "Environment": "QA",
      "Regex": {
        "Manufacturer": [
          {
            "Code": this.form.value.manufacturerCode,
            "Match": true
          }
        ],
        "ProductName": [
          {
            "Code": "&amp|&#xE9|&#xE2|&#xEE|&#xE0|&#x2019|&#xB0",
            "Match": false
          }
        ],
        "ProductUrl": [
          {
            "Code": this.form.value.productUrl,
            "Match": true
          }
        ],
        "ProductId": [
          {
            "Code": "#|&|;|:|,",
            "Match": false
          }
        ],
        "Price": [
          {
            "Code": "^[0-9]*$|(\\d+\\.\\d+(.\\d+(.\\d+)?)?)|\\d+",
            "Match": true
          }
        ],
        "Stock": [
          {
            "Code": "InStock|OutOfStock",
            "Match": true
          }
        ],
        "ImageUri": [
          {
            "Code": this.form.value.imageUri,
            "Match": true
          }
        ]
      },
      "RobotTypes": {
        "Name": this.form.value.typeRobot,
        "TaskID": this.form.value.idTask,
        "ExcludeFields": []
      },
      "debugLog": false
    }
    /* const body = {
      "CheckDuplicates": {
        "ProductUrl": true,
        "ProductName": true,
        "ProductId": true
      },
      "CheckMappingCodes": true,
      "CultureCode": "pt-BR",
      "Environment": "QA",
      "Regex": {
        "Manufacturer": [
          {
            "Code": "Philips",
            "Match": true
          }
        ],
        "ProductName": [
          {
            "Code": "&amp|&#xE9|&#xE2|&#xEE|&#xE0|&#x2019|&#xB0",
            "Match": false
          }
        ],
        "ProductUrl": [
          {
            "Code": "https://casasbahia.com.br/",
            "Match": true
          }
        ],
        "ProductId": [
          {
            "Code": "#|&|;|:|,",
            "Match": false
          }
        ],
        "Price": [
          {
            "Code": "^[0-9]*$|(\\d+\\.\\d+(.\\d+(.\\d+)?)?)|\\d+",
            "Match": true
          }
        ],
        "Stock": [
          {
            "Code": "InStock|OutOfStock",
            "Match": true
          }
        ],
        "ImageUri": [
          {
            "Code": "https://imgs.casasbahia.com.br/",
            "Match": true
          }
        ]
      },
      "RobotTypes": {
        "Name": "Crawler",
        "TaskID": "RrpStpIT2gv7VLluD",
        "ExcludeFields": []
      },
      "debugLog": false
    } */

    if (this.form.valid) {
      const TokenApify = "apify_api_Q4q60TiTquK8bxxcJe1luBgwoce66X0fNM5W"

      const urlRequest = `https://api.apify.com/v2/actor-tasks/cs_qa~cs-qa-validation/runs?token=${TokenApify}`;
      this.apifyService.runTaskUpdater(body, urlRequest).subscribe(
        (response) => {
          if (response.data && response.data.id) {
            this.runId = response.data.id;
            console.log("here run ID", this.runId);
            Swal.fire({
              title: "La tarea se envió a ejecutar!",
              text: "Check last run",
              icon: "success"
            });
            this.startLogPolling();
          } else {
            Swal.fire({
              title: "Error!!!",
              text: response,
              icon: "error"
            });
          }
        },
        error => {
          Swal.fire({
            title: "Error!!!",
            text: error.message,
            icon: "error"
          });
        }
      )
    } else {
      Swal.fire({
        title: "Error!",
        text: "Llena los campos para ejecutar la prueba de validación",
        icon: "error"
      });
    }


  }

  ngOnDestroy() {
    if (this.logSubscription) {
      this.logSubscription.unsubscribe(); // Cleanup the subscription when the component is destroyed
    }
  }

}
