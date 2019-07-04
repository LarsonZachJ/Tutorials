import { Injectable } from "@angular/core";
import { MessageService } from 'primeng/primeng';

@Injectable()
export class ToastService {

    public DisplaySuccess(summary: string, detail: string) {
        this.DisplayToast('success', summary, detail);
    }

    public DisplayInfo(summary: string, detail: string) {
        this.DisplayToast('info', summary, detail);
    }

    public DisplayWarn(summary: string, detail: string) {
        this.DisplayToast('warn', summary, detail);
    }

    public DisplayError(summary: string, detail: string) {
        this.DisplayToast('error', summary, detail);
    }

    private DisplayToast(severity: string, summary: string, detail: string) {
        this._messageService.add({
            severity: severity,
            summary: summary,
            detail: detail
        });
    }

    constructor(private _messageService: MessageService) {
    }
}