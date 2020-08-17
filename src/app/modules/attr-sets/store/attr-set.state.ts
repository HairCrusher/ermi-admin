import {Action, NgxsOnInit, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {tap} from "rxjs/operators";
import {AttrSet} from "@modules/attr-sets/types";
import {AttrSetFetch} from "@modules/attr-sets/store/attr-set.actions";
import {AttrSetService} from "@modules/attr-sets/services/attr-set.service";

export interface AttrSetStateModel {
  attrSets: AttrSet[]
}

@State<AttrSetStateModel>({
  name: 'attrSets',
  defaults: {
    attrSets: []
  }
})
@Injectable()
export class AttrSetState implements NgxsOnInit {

  constructor(private attrSetService: AttrSetService) {
  }

  ngxsOnInit({dispatch}: StateContext<AttrSetStateModel>) {
    dispatch(new AttrSetFetch());
  }

  @Selector()
  static attrSets({attrSets}: AttrSetStateModel) {
    return attrSets;
  }

  @Action(AttrSetFetch)
  fetchAttrs(
    {patchState, getState}: StateContext<AttrSetStateModel>
  ) {
    const {attrSets} = getState();
    if (!attrSets.length) {
      return this.attrSetService.list().pipe(tap(a => patchState({attrSets: a})))
    }
  }


}
