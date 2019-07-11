import { FormGroup } from '@angular/forms';

export class GenericValidator {
  constructor(
    private validationMesssages: { [key: string]: { [key: string]: string } }
  ) {}

  processMessages(container: FormGroup): { [key: string]: string } {
    const messages = {};
    for (const controlKey in container.controls) {
      if (container.controls.hasOwnProperty(controlKey)) {
        const c = container.controls[controlKey];
        if (c instanceof FormGroup) {
          const childMessages = this.processMessages(c);
          Object.assign(messages, childMessages);
        } else {
          if (this.validationMesssages[controlKey]) {
            messages[controlKey] = '';
            if ((c.dirty || c.touched) && c.errors) {
              Object.keys(c.errors).map((messageKey) => {
                if (this.validationMesssages[controlKey][messageKey]) {
                  messages[controlKey] +=
                    this.validationMesssages[controlKey][messageKey] + ' ';
                }
              });
            }
          }
        }
      }
    }
    return messages;
  }
}
