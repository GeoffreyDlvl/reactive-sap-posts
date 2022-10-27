export enum PostEventType {
  CREATE,
  DELETE,
}

export class PostEvent {
  private readonly postName: string;
  private readonly type: PostEventType;
  private date: Readonly<Date>;

  private eventTypeToActionStringMap = new Map<PostEventType, string>([
    [PostEventType.CREATE, 'created'],
    [PostEventType.DELETE, 'removed'],
  ]);

  constructor(postName: string, type: PostEventType, date: Date) {
    this.postName = postName;
    this.type = type;
    this.date = date;
  }

  print(): string {
    return (
      this.postName +
      ' ' +
      this.eventTypeToActionStringMap.get(this.type) +
      ' the ' +
      this.date.toString()
    );
  }
}
