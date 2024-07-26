import pageDetails from '../../src/utils/page';

describe('pageDetails', () => {
  it('should return default values when no parameters are provided', () => {
    const result = pageDetails({});
    expect(result).toEqual({
      pageSize: 5,
      page: 0,
      sort: { _id: 1 }
    });
  });

  it('should handle custom pageSize, page, and ordering', () => {
    const params = {
      pageSize: '10',
      page: '2',
      ordering: 'name:-1'
    };
    const result = pageDetails(params);
    expect(result).toEqual({
      pageSize: 10,
      page: 1,
      sort: { name: -1 }
    });
  });

  it('should handle string values for pageSize and page correctly', () => {
    const params = {
      pageSize: '20',
      page: '3'
    };
    const result = pageDetails(params);
    expect(result).toEqual({
      pageSize: 20,
      page: 2,
      sort: { _id: 1 }
    });
  });

  it('should handle ordering with ascending and descending', () => {
    const paramsAsc = {
      ordering: 'createdAt:1'
    };
    const resultAsc = pageDetails(paramsAsc);
    expect(resultAsc).toEqual({
      pageSize: 5,
      page: 0,
      sort: { createdAt: 1 }
    });

    const paramsDesc = {
      ordering: 'updatedAt:-1'
    };
    const resultDesc = pageDetails(paramsDesc);
    expect(resultDesc).toEqual({
      pageSize: 5,
      page: 0,
      sort: { updatedAt: -1 }
    });
  });

  it('should default sort order to ascending when sortOrder is not "1" or "-1"', () => {
    const params = {
      ordering: 'title:abc'
    };
    const result = pageDetails(params);
    expect(result).toEqual({
      pageSize: 5,
      page: 0,
      sort: { title: -1 }
    });
  });
});
