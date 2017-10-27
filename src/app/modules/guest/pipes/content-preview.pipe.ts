import { Pipe, PipeTransform } from '@angular/core';

interface Post {
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
@Pipe({
  name: 'contentPreview'
})
export class ContentPreviewPipe implements PipeTransform {

  transform(content: Post, args?: any): String {
     let preview = content.contenu + '...<br>' ;
     const showMore = `<a href="/category=${content.category.titre}/post=${content.titre}/${content.id}">Voir la suite</a>`;
     preview = '<p>' + preview + showMore + '</p>';
     return preview;
  }

}
