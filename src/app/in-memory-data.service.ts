import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const books = [
      {
        Title: '考研数学复习全书',
        ISBN: '9787515020303',
        Author: '李永乐',
        Date: '2017-12',
        Summary: '数学辅导书'
      },
      {
        Title: '百年孤独',
        ISBN: '9787544253994',
        Author: '[哥伦比亚]] 加西亚 · 马尔克斯 ',
        Date: '2011-6',
        Summary: '《百年孤独》是魔幻现实主义文学的代表作，描写了布恩迪亚家族七代人的传奇故事，以及加勒比海沿岸小镇马孔多的百年兴衰，反映了拉丁美洲一个世纪以来风云变幻的历史.'
      },
      {
        title: 'Python Cookbook',
        ISBN: '9780596007973',
        Author: 'Alex Martelli / Anna Ravenscroft / David Ascher ',
        Date: '2005-3',
        Summary: 'e Python Cookbook, 2nd Edition offers a wealth of useful code for all Python programmers.'
      },
    ];
    return { books };
  }
}
