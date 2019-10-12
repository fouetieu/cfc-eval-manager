import { Moment } from 'moment';
import { IObjectif } from 'app/shared/model/objectif.model';
import { ISessionEvaluation } from 'app/shared/model/session-evaluation.model';
import { IPersonnel } from 'app/shared/model/personnel.model';

export interface IEvaluation {
  id?: number;
  dateEvaluation?: Moment;
  note?: number;
  objectif?: IObjectif;
  session?: ISessionEvaluation;
  personnel?: IPersonnel;
}

export class Evaluation implements IEvaluation {
  constructor(
    public id?: number,
    public dateEvaluation?: Moment,
    public note?: number,
    public objectif?: IObjectif,
    public session?: ISessionEvaluation,
    public personnel?: IPersonnel
  ) {}
}
