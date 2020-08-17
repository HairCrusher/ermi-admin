import {Attribute} from "@modules/attributes/types";

export class AttributeFetch {
  public static readonly type = '[Attribute] Fetch attributes';
}

export class AttrTypeFetch {
  public static readonly type = '[AttrType] Fetch attribute types';
}

export class AttributeDelete {
  public static readonly type = '[Attribute] Delete attribute';
  constructor(public payload: {id: number}) {
  }
}

export class AttributeCreate {
  public static readonly type = '[Attribute] Create attribute';
  constructor(public payload: {attribute: Attribute}) {
  }
}

export class AttributeUpdate {
  public static readonly type = '[Attribute] Update attribute';
  constructor(public payload: {attribute: Attribute}) {
  }
}
