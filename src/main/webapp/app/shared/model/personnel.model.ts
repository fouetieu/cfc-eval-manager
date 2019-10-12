import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IObjectif } from 'app/shared/model/objectif.model';
import { IPlanDaction } from 'app/shared/model/plan-daction.model';
import { IReporting } from 'app/shared/model/reporting.model';
import { IEvaluation } from 'app/shared/model/evaluation.model';

export interface IPersonnel {
  id?: number;
  matricule?: string;
  nom?: string;
  poste?: string;
  dateNaiss?: Moment;
  sexe?: string;
  utilisateur?: IUser;
  objectifs?: IObjectif[];
  planDactions?: IPlanDaction[];
  reportings?: IReporting[];
  evaluations?: IEvaluation[];
}

export class Personnel implements IPersonnel {
  constructor(
    public id?: number,
    public matricule?: string,
    public nom?: string,
    public poste?: string,
    public dateNaiss?: Moment,
    public sexe?: string,
    public utilisateur?: IUser,
    public objectifs?: IObjectif[],
    public planDactions?: IPlanDaction[],
    public reportings?: IReporting[],
    public evaluations?: IEvaluation[]
  ) {}
}
