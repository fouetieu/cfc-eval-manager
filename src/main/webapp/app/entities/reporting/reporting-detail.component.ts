import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IReporting } from 'app/shared/model/reporting.model';

@Component({
  selector: 'jhi-reporting-detail',
  templateUrl: './reporting-detail.component.html'
})
export class ReportingDetailComponent implements OnInit {
  reporting: IReporting;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ reporting }) => {
      this.reporting = reporting;
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
