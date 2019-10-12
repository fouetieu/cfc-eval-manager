import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPersonnel } from 'app/shared/model/personnel.model';

@Component({
  selector: 'jhi-personnel-detail',
  templateUrl: './personnel-detail.component.html'
})
export class PersonnelDetailComponent implements OnInit {
  personnel: IPersonnel;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ personnel }) => {
      this.personnel = personnel;
    });
  }

  previousState() {
    window.history.back();
  }
}
