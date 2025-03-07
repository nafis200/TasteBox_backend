import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // search(searchableFields: string[]) {
  //   const searchTerm = this?.query;

  //   if (searchTerm && typeof searchTerm === 'object') {
  //     const conditions = Object.entries(searchTerm).map(([field, value]) => {
  //       if (searchableFields.includes(field)) {
  //         if (field === 'dietary_preferences') {
  //           return {
  //             [field]: { $elemMatch: { $regex: value, $options: 'i' } },
  //           };
  //         } else if (field === 'rating') {
  //           return {
  //             [field]: { $gte: 1.0 },
  //           };
  //         } else if (field === 'price') {
  //           return {
  //             [field]: { $lte: parseFloat(value as string) },
  //           };
  //         } else if (field === 'availability') {
  //           return {
  //             [field]: value === 'true',
  //           };
  //         } else {
  //           return {
  //             [field]: { $regex: value, $options: 'i' },
  //           };
  //         }
  //       }
  //       return null;
  //     });

  //     const validConditions = conditions.filter(
  //       (condition) => condition !== null,
  //     );
  //     if (validConditions.length > 0) {
  //       this.modelQuery = this.modelQuery.find({ $and: validConditions });
  //     }
  //   }

  //   return this;
  // }

  search(searchableFields: string[]) {
    const searchTerm = this?.query;

    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $and: Object.entries(searchTerm)
          .map(([field, value]) => {
            if (searchableFields.includes(field)) {
              if (field === 'rating' || field === 'price') {
                return {
                  [field]: { $gte: parseFloat(value as string) },
                };
              } else if (field === 'dietary_preferences') {
                return {
                  [field]: { $elemMatch: { $regex: value, $options: 'i' } },
                };
              } else if (field === 'availability') {
                return {
                  [field]: value === 'true',
                };
              } else {
                return {
                  [field]: { $regex: value, $options: 'i' },
                };
              }
            }
            return null;
          })
          .filter((condition) => condition !== null),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query }; // copy

    // Filtering
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

    excludeFields.forEach((el) => delete queryObj[el]);


    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;


    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;
