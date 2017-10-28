export interface Post {
    createdAt: Date;
    updatedAt: Date;
    id: Number;
    titre: String;
    contenu: String;
    date: Date;
    categoryId: Number;
    category: {
      id: Number;
      titre: String;
      createdAt: Date;
      updatedAt: Date;
    };
}
