import { IObjectif } from 'app/shared/model/objectif.model';
import { IPersonnel } from 'app/shared/model/personnel.model';

export interface IReporting {
  id?: number;
  libelle?: string;
  description?: any;
  documentContentType?: string;
  document?: any;
  objectif?: IObjectif;
  personnel?: IPersonnel;
}

export class Reporting implements IReporting {
  constructor(
    public id?: number,
    public libelle?: string,
    public description?: any,
    public documentContentType?: string,
    public document?: any,
    public objectif?: IObjectif,
    public personnel?: IPersonnel
  ) {}
}
