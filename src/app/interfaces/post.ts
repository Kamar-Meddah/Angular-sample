export interface Post {
    id: Number;
    titre: String;
    contenu: String;
    date: Date;
    categoryId: Number;
    category: {
      id: Number;
      titre: String
    };
}
