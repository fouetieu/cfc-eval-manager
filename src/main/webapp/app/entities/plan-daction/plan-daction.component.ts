import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { IPlanDaction } from 'app/shared/model/plan-daction.model';
import { AccountService } from 'app/core/auth/account.service';
import { PlanDactionService } from './plan-daction.service';

@Component({
  selector: 'jhi-plan-daction',
  templateUrl: './plan-daction.component.html'
})
export class PlanDactionComponent implements OnInit, OnDestroy {
  planDactions: IPlanDaction[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected planDactionService: PlanDactionService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.planDactionService
      .query()
      .pipe(
        filter((res: HttpResponse<IPlanDaction[]>) => res.ok),
        map((res: HttpResponse<IPlanDaction[]>) => res.body)
      )
      .subscribe((res: IPlanDaction[]) => {
        this.planDactions = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPlanDactions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPlanDaction) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInPlanDactions() {
    this.eventSubscriber = this.eventManager.subscribe('planDactionListModification', response => this.loadAll());
  }
}
