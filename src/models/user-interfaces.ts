import { Document, FlatRecord, Model, Types } from 'mongoose';
import { PlaceDocT } from './place-interfaces';

export interface UserAuthI {
    name?: string;
    email: string;
    password: string;
}

export interface UserSchemaI extends UserAuthI {
    imgURL: string;
    places: [Types.ObjectId];
}

export type UserDocT = Document<unknown, any, FlatRecord<UserSchemaI>> &
    FlatRecord<UserSchemaI> & {
        _id: Types.ObjectId;
    };

export type UserModelT = Model<FlatRecord<UserSchemaI>, {}, {}, {}, any>;

export interface UserDocMethodsI {
    signup: (this: UserDocT) => Promise<UserSchemaI & { _id: Types.ObjectId }>;
    login: (this: UserDocT) => Promise<UserSchemaI & { _id: Types.ObjectId }>;
    addPlace: (this: UserDocT, place: PlaceDocT) => Promise<any>;
    deletePlace: (this: UserDocT, place: PlaceDocT) => Promise<any>;
}

export interface UserDocStaticsI {
    getUserPlaces: (this: UserModelT, userId: Types.ObjectId | string) => Promise<[any]>;
    deleteUser: (this: UserModelT, userId: Types.ObjectId | string, password: string) => Promise<any>;
}
