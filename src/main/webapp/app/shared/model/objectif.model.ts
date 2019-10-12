import { Moment } from 'moment';
import { IPlanDaction } from 'app/shared/model/plan-daction.model';
import { IReporting } from 'app/shared/model/reporting.model';
import { IEvaluation } from 'app/shared/model/evaluation.model';
import { IPersonnel } from 'app/shared/model/personnel.model';

export interface IObjectif {
  id?: number;
  libelle?: string;
  livrable?: any;
  indicateur?: any;
  dateFin?: Moment;
  planDactions?: IPlanDaction[];
  reportings?: IReporting[];
  evaluations?: IEvaluation[];
  personnel?: IPersonnel;
}

export class Objectif implements IObjectif {
  constructor(
    public id?: number,
    public libelle?: string,
    public livrable?: any,
    public indicateur?: any,
    public dateFin?: Moment,
    public planDactions?: IPlanDaction[],
    public reportings?: IReporting[],
    public evaluations?: IEvaluation[],
    public personnel?: IPersonnel
  ) {}
}
