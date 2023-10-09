import { MatPaginator } from '@angular/material/paginator';

export const setDataPaginator = (paginator: MatPaginator, totalCount: number): void => {
  paginator.length = totalCount;
};
