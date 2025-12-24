import { extend } from 'lodash';

export interface ISources {
  id: number;
  name: string;
}

export interface ISourcesFull extends ISources {
  key: {
    id: number;
    sourceId: number;
    apiKey: string;
    isActive: true;
    createdAt: string;
    updateAt: string;
  };
  models: string[];
}
