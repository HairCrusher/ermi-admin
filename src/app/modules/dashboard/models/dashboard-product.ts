import {EsProduct, EsProductVariant} from "@modules/dashboard/types";
import {Image} from "@modules/images/types";

export class DashboardProduct {

  isSingle: boolean;
  priceRange: { min: number, max: number };
  isPriceRange: boolean;
  images: Image[];

  get id(): number {
    return this.product.id;
  }

  get name(): string {
    return this.product.name;
  }

  get desc(): string | undefined {
    return this.product.desc;
  }

  get attrSetId(): number {
    return this.product.attr_set_id
  }

  // TODO get categories by id
  get categories(): number[] {
    return this.product.cats_ids;
  }

  get variants(): EsProductVariant[] {
    return this.product.variants;
  }

  constructor(
    private readonly product: EsProduct
  ) {
    this.isSingle = product.variants.length === 1;
    this.images = product.variants.map(x => x.images).flat();
    this.setPriceRange();
  }

  private setPriceRange(): void {
    const min = Math.min(...this.variants.map(x => x.price));
    const max = Math.max(...this.variants.map(x => x.price));

    this.priceRange = {min, max};
    this.isPriceRange = min === max;
  }

  getVariantById(id: number): EsProductVariant | null {
    return this.variants.find(x => x.id === id);
  }

}
