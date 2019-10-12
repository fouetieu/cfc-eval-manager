import { Moment } from 'moment';
import { IObjectif } from 'app/shared/model/objectif.model';
import { IPersonnel } from 'app/shared/model/personnel.model';

export interface IPlanDaction {
  id?: number;
  tache?: string;
  description?: any;
  dateDebut?: Moment;
  dateFIn?: Moment;
  objectif?: IObjectif;
  personnel?: IPersonnel;
}

export class PlanDaction implements IPlanDaction {
  constructor(
    public id?: number,
    public tache?: string,
    public description?: any,
    public dateDebut?: Moment,
    public dateFIn?: Moment,
    public objectif?: IObjectif,
    public personnel?: IPersonnel
  ) {}
}
