import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import { PaginationParameters } from 'src/scores/dto/pagination-parameters.dto';
import { ScoreDto } from 'src/scores/dto/score.dto';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return this.entityModel
      .findOne(entityFilterQuery, {
        _id: 0,
        __v: 0,
        ...projection,
      })
      .exec();
  }

  async find(
    entityFilterQuery: FilterQuery<T>,
    paginationParameters: PaginationParameters,
  ): Promise<T[] | null> {
    return this.entityModel.find(
      entityFilterQuery,
      {},
      {
        lean: true,
        sort: {
          scoreDate: -1,
        },
        ...paginationParameters,
      },
    );
  }

  async count(): Promise<number> {
    return this.entityModel.count({});
  }

  async create(createEntityData: ScoreDto): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        new: true,
      },
    );
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }
}
