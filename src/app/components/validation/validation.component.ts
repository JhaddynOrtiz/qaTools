import { Component } from '@angular/core';
import { TaskService } from '../../services/tasks.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent {

  //https://console.apify.com/organization/GTLDwzJnfTMQqgBR4/actors/tasks/XETtJl5o4ddH0I1Sg/runs/MKZzQbgNt4wuQ0YDw#log
  //https://console.apify.com/organization/OrganizationId/actors/tasks/ActorId/runs/RunId#log
  idTask: string = '';
  typeRobot: string = '';
  manufacturerCode: string = '';
  productUrl: string = '';
  imageUri: string = '';
  cultureCode: string = '';

  constructor(private taskService: TaskService) { }

  sendValidation() {
    const body = {
      "CheckDuplicates": {
        "ProductUrl": true,
        "ProductName": true,
        "ProductId": true
      },
      "CheckMappingCodes": true,
      "CultureCode": this.cultureCode,
      "Environment": "QA",
      "Regex": {
        "Manufacturer": [
          {
            "Code": this.manufacturerCode,
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
            "Code": this.productUrl,
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
            "Code": this.imageUri,
            "Match": true
          }
        ]
      },
      "RobotTypes": {
        "Name": this.typeRobot,
        "TaskID": this.idTask,
        "ExcludeFields": []
      },
      "debugLog": false
    }

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
  }

}
