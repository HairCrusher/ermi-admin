import {Attribute, AttrType} from "@modules/attributes/types";
import {Action, NgxsOnInit, Selector, State, StateContext, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {
  AttributeCreate,
  AttributeDelete,
  AttributeFetch, AttributeUpdate,
  AttrTypeFetch
} from "@modules/attributes/store/attribute.actions";
import {AttributeService} from "@modules/attributes/services/attribute.service";
import {catchError, tap} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {EMPTY, of} from "rxjs";

export interface AttributeStateModel {
  attributes: Attribute[];
  types: AttrType[];
}

@State<AttributeStateModel>({
  name: 'attributes',
  defaults: {
    attributes: [],
    types: []
  }
})
@Injectable()
export class AttributeState implements NgxsOnInit {

  constructor(private attributeService: AttributeService) {
  }

  ngxsOnInit({dispatch}: StateContext<AttributeStateModel>) {
    dispatch(new AttributeFetch());
    dispatch(new AttrTypeFetch());
  }

  @Selector()
  static attributes({attributes}: AttributeStateModel) {
    return attributes;
  }

  @Selector()
  static types({types}: AttributeStateModel) {
    return types;
  }

  @Action(AttributeFetch)
  fetchAttrs(
    {patchState, getState}: StateContext<AttributeStateModel>
  ) {
    const {attributes} = getState();
    if (!attributes.length) {
      return this.attributeService.list().pipe(tap(a => patchState({attributes: a})));
    }
  }

  @Action(AttrTypeFetch)
  fetchAttrTypes(
    {patchState, getState}: StateContext<AttributeStateModel>
  ) {
    const {types} = getState();
    if (!types.length) {
      return this.attributeService.getTypes().pipe(tap(t => patchState({types: t})));
    }
  }

  @Action(AttributeCreate)
  createAttribute(
    {patchState, getState}: StateContext<AttributeStateModel>,
    {payload: {attribute}}: AttributeCreate
  ) {
    const {attributes} = getState();
    return this.attributeService.create(attribute)
      .pipe(
        tap((attr) => patchState({attributes: [...attributes, attr]})),
      );
  }

  @Action(AttributeUpdate)
  updateAttribute(
    {patchState, getState}: StateContext<AttributeStateModel>,
    {payload: {attribute}}: AttributeUpdate
  ) {
    return this.attributeService.update(attribute.id, attribute)
      .pipe(
        tap(() => {
          const attributes = [...getState().attributes];
          let attrIndex = attributes.findIndex(a => a.id === attribute.id);
          if (attrIndex + 1) {
            attribute.type = getState().types.find(x => x.id === attribute.type_id);
            attributes[attrIndex] = attribute;
            patchState({attributes});
          }
        })
      );
  }

  @Action(AttributeDelete)
  deleteAttribute(
    {patchState, getState}: StateContext<AttributeStateModel>,
    {payload: {id}}: AttributeDelete
  ) {
    return this.attributeService.delete(id).pipe(
      tap(() => {
        let {attributes} = getState();
        attributes = attributes.filter(x => x.id !== id);
        patchState({attributes});
      }),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return EMPTY;
      })
    );
  }


}
