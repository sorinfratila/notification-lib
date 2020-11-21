export class Notification {
  private static id = 1;

  private id: number;
  public severity: severityEnum;
  public message: string;
  public createdAt: Date;
  public confirmed: boolean;
  public timeout: number;

  constructor(data: any) {
    this.id = Notification.id++;

    const { severity, timeout, confirmed, message } = data;

    this.severity = severity;
    this.message = message;
    this.createdAt = new Date();
    this.confirmed = confirmed;
    this.timeout = timeout;
  }

  public getId(): number {
    return Notification.id;
  }
}

export type severityEnum = 'warning' | 'info' | 'error' | 'neutral';
