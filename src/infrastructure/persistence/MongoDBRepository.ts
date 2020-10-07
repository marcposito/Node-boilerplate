import { Db, Collection } from 'mongodb';
import MongoDBConnection from "../db/MongoDBConnection";
import IQueryParam from "../../domain/repository/IQueryParam";

class MongoDBRepository {

  private readonly _collectionName: string;

  constructor(collectionName: string) {
    this._collectionName = collectionName;
  }

  async find(queries: Array<IQueryParam> = []): Promise<Array<any>> {
    return await this.collection.find(queries.reduce((filters: any, query: any): any => {
      filters[query.key] = query.value;

      return filters;
    }, {})).toArray();
  }

  async insert(item: any): Promise<any> {
    const data = await this.collection.insertOne(Object.assign(item, {
      updatedAt: new Date(),
      createdAt: new Date()
    }));

    return data.ops;
  }

  async update(id: string, item: any): Promise<any> {
    const data = await this.collection.findOneAndUpdate({ _id: id }, {
      $set: Object.assign(item, {
        updatedAt: new Date()
      })
    }, { returnOriginal: false });

    return data.value;
  }

  async delete(id: string): Promise<boolean> {
    const data = await this.collection.deleteOne({ _id: id });

    return data.result.ok === 1;
  }

  get connection(): Db {
    return MongoDBConnection.getConnection();
  }

  get collection(): Collection {
    return this.connection.collection(this._collectionName);
  }

}

export default MongoDBRepository;
