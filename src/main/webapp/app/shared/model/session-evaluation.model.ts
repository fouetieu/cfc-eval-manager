import { Moment } from 'moment';
import { IEvaluation } from 'app/shared/model/evaluation.model';

export interface ISessionEvaluation {
  id?: number;
  libelle?: string;
  dateDebut?: Moment;
  dateFin?: Moment;
  active?: boolean;
  evaluations?: IEvaluation[];
}

export class SessionEvaluation implements ISessionEvaluation {
  constructor(
    public id?: number,
    public libelle?: string,
    public dateDebut?: Moment,
    public dateFin?: Moment,
    public active?: boolean,
    public evaluations?: IEvaluation[]
  ) {
    this.active = this.active || false;
  }
}
