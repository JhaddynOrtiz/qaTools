import { Component } from '@angular/core';
import { TaskService } from '../../services/tasks.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent {

  /* idTask: string = '';
  typeRobot: string = '';
  manufacturerCode: string = '';
  productUrl: string = '';
  imageUri: string = '';
  cultureCode: string = ''; */

  form: FormGroup;

  constructor(private taskService: TaskService) {
    this.form = new FormGroup({
      idTask: new FormControl('', [Validators.required]),
      typeRobot: new FormControl('crawler', [Validators.required]),
      manufacturerCode: new FormControl('', [Validators.required]),
      productUrl: new FormControl('', [Validators.required, Validators.pattern('https?://.+')]),
      imageUri: new FormControl('', [Validators.pattern('https?://.+')]),
      cultureCode: new FormControl('', [Validators.required])
    });
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

    if (this.form.valid) {
      this.taskService.runTaskUpdater(body, "https://api.apify.com/v2/actor-tasks/cs_qa~cs-qa-validation/runs?token=apify_api_Q4q60TiTquK8bxxcJe1luBgwoce66X0fNM5W").subscribe(
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
    } else {
      Swal.fire({
        title: "Error!",
        text: "Llena los campos para ejecutar la prueba de validación",
        icon: "error"
      });
    }


  }

}
