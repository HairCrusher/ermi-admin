import {Attribute} from "@modules/attributes/types";

export type AttrSet = {
  id: number;
  name: string;
  desc: string;
  attributes: Attribute[];
};
