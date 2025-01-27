import { SortOrder } from 'mongoose';

import IParams from '../interfaces/params';

export default function pageDetails(params: IParams) {
  let pageDetails: any = {};

  const { pageSize = '30', page = '1', ordering = '_id:1' } = params;
  const [sortField, sortOrder] = ordering.split(':');
  const sort: { [key: string]: SortOrder } = {
    [sortField]: sortOrder === '1' ? 1 : -1,
  };

  pageDetails.pageSize = parseInt(pageSize);
  pageDetails.page = parseInt(page) - 1;
  pageDetails.sort = sort;

  return pageDetails;
}
