import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { IReporting } from 'app/shared/model/reporting.model';
import { AccountService } from 'app/core/auth/account.service';
import { ReportingService } from './reporting.service';

@Component({
  selector: 'jhi-reporting',
  templateUrl: './reporting.component.html'
})
export class ReportingComponent implements OnInit, OnDestroy {
  reportings: IReporting[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected reportingService: ReportingService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.reportingService
      .query()
      .pipe(
        filter((res: HttpResponse<IReporting[]>) => res.ok),
        map((res: HttpResponse<IReporting[]>) => res.body)
      )
      .subscribe((res: IReporting[]) => {
        this.reportings = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInReportings();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IReporting) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInReportings() {
    this.eventSubscriber = this.eventManager.subscribe('reportingListModification', response => this.loadAll());
  }
}
