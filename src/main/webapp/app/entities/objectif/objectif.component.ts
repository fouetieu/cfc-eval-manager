import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { IObjectif } from 'app/shared/model/objectif.model';
import { AccountService } from 'app/core/auth/account.service';
import { ObjectifService } from './objectif.service';

@Component({
  selector: 'jhi-objectif',
  templateUrl: './objectif.component.html'
})
export class ObjectifComponent implements OnInit, OnDestroy {
  objectifs: IObjectif[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected objectifService: ObjectifService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.objectifService
      .query()
      .pipe(
        filter((res: HttpResponse<IObjectif[]>) => res.ok),
        map((res: HttpResponse<IObjectif[]>) => res.body)
      )
      .subscribe((res: IObjectif[]) => {
        this.objectifs = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInObjectifs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IObjectif) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInObjectifs() {
    this.eventSubscriber = this.eventManager.subscribe('objectifListModification', response => this.loadAll());
  }
}
