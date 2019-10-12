import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IPersonnel } from 'app/shared/model/personnel.model';
import { AccountService } from 'app/core/auth/account.service';
import { PersonnelService } from './personnel.service';

@Component({
  selector: 'jhi-personnel',
  templateUrl: './personnel.component.html'
})
export class PersonnelComponent implements OnInit, OnDestroy {
  personnels: IPersonnel[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected personnelService: PersonnelService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.personnelService
      .query()
      .pipe(
        filter((res: HttpResponse<IPersonnel[]>) => res.ok),
        map((res: HttpResponse<IPersonnel[]>) => res.body)
      )
      .subscribe((res: IPersonnel[]) => {
        this.personnels = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPersonnels();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPersonnel) {
    return item.id;
  }

  registerChangeInPersonnels() {
    this.eventSubscriber = this.eventManager.subscribe('personnelListModification', response => this.loadAll());
  }
}
