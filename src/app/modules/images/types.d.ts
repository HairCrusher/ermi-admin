export interface Image {
  id: number;
  original_uri: string;
  large_uri: string;
  medium_uri: string;
  small_uri: string;
  thumbnail_uri: string;
  name: string;
  mimetype: string;
  size: number;
  ProductVariantImgModel: ProductVariantImgModel;
}

export interface ProductVariantImgModel {
  image_id: number;
  position: number;
  product_variant_id: number;
}
