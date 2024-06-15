import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class GlobaConfirmations {
  constructor(private messageSerivrace: MessageService) {}
  updateandCreateConfrmationsmeaasges(
    ServaiceVaribel: any,
    data: any,
    status: string
  ) {
    ServaiceVaribel.subscribe(
      () => {
        console.log(data.name, 'from the service');
        this.messageSerivrace.add({
          severity: 'success',
          summary: 'serviace meesage',

          detail: `${
            data.name == undefined ? data : data.name
          }, has been ${status}`,
        });
      },
      () => {
        this.messageSerivrace.add({
          severity: 'error',
          summary: 'serviace meesage',
          detail: `Faild to create Category !`,
        });
      }
    );
  }
}
