import { SortOrder } from 'mongoose';
import IParams from '../Interfaces/IParams';

export default function PageDetails(params: IParams) {
  let pageDetails: any = {};

  const { pageSize = '5', page = '1', ordering = '_id:1' } = params;
  const [sortField, sortOrder] = ordering.split(':');
  const sort: { [key: string]: SortOrder } = { [sortField]: sortOrder === '1' ? 1 : -1 };

  pageDetails.pageSize = parseInt(pageSize);
  pageDetails.page = parseInt(page) - 1;
  pageDetails.sort = sort;

  return pageDetails;
}
