import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export interface ListEquationItem {
  coefficientA: number;
  coefficientB: number;
  coefficientC: number;
  discriminant: number;
  firstRoot: number;
  secondRoot: number;
  solvedAt: Date;
}

/**
 * Data source for the ListEquation view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ListEquationDataSource extends DataSource<ListEquationItem> {
  data: ListEquationItem[];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(sourceData: ListEquationItem[]) {
    super();

    this.data = sourceData;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ListEquationItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ListEquationItem[]): ListEquationItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ListEquationItem[]): ListEquationItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'coefficientA': return compare(a.coefficientA, b.coefficientA, isAsc);
        case 'coefficientB': return compare(a.coefficientB, b.coefficientB, isAsc);
        case 'coefficientC': return compare(a.coefficientC, b.coefficientC, isAsc);
        case 'discriminant': return compare(a.discriminant, b.discriminant, isAsc);
        case 'firstRoot': return compare(a.firstRoot, b.firstRoot, isAsc);
        case 'secondRoot': return compare(a.secondRoot, b.secondRoot, isAsc);
        case 'solvedAt': return compare(a.solvedAt, b.solvedAt, isAsc);

        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number | Date, b: string | number | Date, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
