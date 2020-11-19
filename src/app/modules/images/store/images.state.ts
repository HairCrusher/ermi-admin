import {Product} from "@modules/products/types";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {Image} from "@modules/images/types";
import {ImageDelete, ImagesFetch} from "@modules/images/store/images.actions";
import {ImagesService} from "@modules/images/services/images.service";
import {tap} from "rxjs/operators";

export interface ImagesStateModel {
  images: Image[];
  total: number;
  loading: boolean;
}

@State<ImagesStateModel>({
  name: 'images',
  defaults: {
    images: [],
    total: 0,
    loading: false
  }
})
@Injectable()
export class ImagesState {

  constructor(private imagesService: ImagesService) {
  }

  @Selector()
  static images({images}: ImagesStateModel) {
    return images;
  }

  @Selector()
  static total({total}: ImagesStateModel) {
    return total;
  }

  @Selector()
  static loading({loading}: ImagesStateModel) {
    return loading;
  }

  @Action(ImagesFetch)
  fetchImages(
    {patchState}: StateContext<ImagesStateModel>,
    {payload: {options}}: ImagesFetch
  ) {
    patchState({loading: true});
    return this.imagesService.list(options).pipe(
      tap(({rows, count}) => patchState({loading: false, images: rows, total: count}))
    )
  }

  @Action(ImageDelete)
  deleteImage(
    {dispatch}: StateContext<ImagesStateModel>,
    {payload: {id}}: ImageDelete)
  {
    return this.imagesService.delete(id).pipe(tap(() => dispatch(new ImagesFetch())))
  }

}
