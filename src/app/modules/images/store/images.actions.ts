import {FetchOptions} from "../../../types";

export class ImagesFetch {
  public static readonly type = '[Images] Fetch images';
  constructor(public payload: { options: FetchOptions } = {options: {offset: 0, limit: 20}}) {
  }
}

export class ImageDelete {
  public static readonly type = '[Image] Delete image';
  constructor(public payload: { id }) {
  }
}
