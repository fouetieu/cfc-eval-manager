import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { ISessionEvaluation } from 'app/shared/model/session-evaluation.model';
import { AccountService } from 'app/core/auth/account.service';
import { SessionEvaluationService } from './session-evaluation.service';

@Component({
  selector: 'jhi-session-evaluation',
  templateUrl: './session-evaluation.component.html'
})
export class SessionEvaluationComponent implements OnInit, OnDestroy {
  sessionEvaluations: ISessionEvaluation[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected sessionEvaluationService: SessionEvaluationService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.sessionEvaluationService
      .query()
      .pipe(
        filter((res: HttpResponse<ISessionEvaluation[]>) => res.ok),
        map((res: HttpResponse<ISessionEvaluation[]>) => res.body)
      )
      .subscribe((res: ISessionEvaluation[]) => {
        this.sessionEvaluations = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSessionEvaluations();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISessionEvaluation) {
    return item.id;
  }

  registerChangeInSessionEvaluations() {
    this.eventSubscriber = this.eventManager.subscribe('sessionEvaluationListModification', response => this.loadAll());
  }
}
