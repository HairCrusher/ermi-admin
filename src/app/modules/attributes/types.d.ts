export type Attribute = {
  id?: number;
  name: string;
  slug: string;
  created_at?: Date;
  updated_at?: Date;
  type: AttrType;
  type_id: number;
};

export type AttrType = {
  id?: number;
  type: string;
  created_at?: Date;
  updated_at?: Date;
}
