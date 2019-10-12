import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPlanDaction } from 'app/shared/model/plan-daction.model';

@Component({
  selector: 'jhi-plan-daction-detail',
  templateUrl: './plan-daction-detail.component.html'
})
export class PlanDactionDetailComponent implements OnInit {
  planDaction: IPlanDaction;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ planDaction }) => {
      this.planDaction = planDaction;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
