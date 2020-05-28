export enum AEventStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBISHED',
  CANCELLED = 'CANCELLED'
}

export class AEvent {
  public id: bigint;
  public titel: string;
  public start: Date;
  public end: Date;
  public description: string;
  public status: string;
  public participationFee: number;
  public maxParticipants: number;

  static trueCopy(ev: AEvent): AEvent {
    return Object.assign(new AEvent(), ev);
  }

  public equals(e): boolean {
    return this.titel === e.titel &&
      this.description === e.description &&
    this.start === e.start &&
    this.end === e.end &&
    this.status === e.status &&
    this.maxParticipants === e.maxParticipants &&
    this.participationFee === e.participationFee;
  }

}

