import { Categorie } from './categorie';

export interface Post {
    createdAt?: Date;
    updatedAt?: Date;
    id: Number;
    titre: String;
    contenu: String;
    date?: Date;
    categoryId?: Number;
    category?: Categorie;
}
