import { getKeywordCounts, normalizeQuery } from '../helpers';

describe('getKeywordCounts', () => {
  it('will count the correct keywords from title and abstract', () => {
    const title = 'Drone Delivery';
    const abstract = 'This paper discusses the future of delivery.';

    const papers = [
      {
        id: '1',
        title,
        authors: [{ name: 'John Doe' }],
        abstract,
        links: [],
        downloadUrl: 'https://example.com',
        publishedDate: '2021-01-01',
      },
    ];

    const query = 'drone delivery';

    const keywordCounts = getKeywordCounts(papers, query);

    expect(keywordCounts).toEqual({
      drone: 1,
      delivery: 2,
    });
  });

  it('will count the correct keywords from multiple papers', () => {
    const papers = [
      {
        id: '1',
        title: 'Drone Delivery',
        authors: [{ name: 'John Doe' }],
        abstract: 'This paper discusses the future of delivery.',
        links: [],
        downloadUrl: 'https://example.com',
        publishedDate: '2021-01-01',
      },
      {
        id: '2',
        title: 'Drone Delivery 2',
        authors: [{ name: 'Jane Doe' }],
        abstract: 'This paper discusses the future of drone delivery.',
        links: [],
        downloadUrl: 'https://example.com',
        publishedDate: '2021-01-02',
      },
    ];

    const query = 'drone delivery';

    const keywordCounts = getKeywordCounts(papers, query);

    expect(keywordCounts).toEqual({
      drone: 3,
      delivery: 4,
    });
  });

  it('will count the correct keywords from title and abstract with different cases', () => {
    const papers = [
      {
        id: '1',
        title: 'Drone AND Delivery',
        authors: [{ name: 'John Doe' }],
        abstract: 'This paper discusses the future of delivery.',
        links: [],
        downloadUrl: 'https://example.com',
        publishedDate: '2021-01-01',
      },
    ];

    const query = 'DRONE delivery';

    const keywordCounts = getKeywordCounts(papers, query);

    expect(keywordCounts).toEqual({
      drone: 1,
      delivery: 2,
    });
  });

  it('will not count the same keyword multiple times in the same paper', () => {
    const papers = [
      {
        id: '1',
        title: 'Drone Delivery',
        authors: [{ name: 'John Doe' }],
        abstract: 'This paper discusses the future of delivery.',
        links: [],
        downloadUrl: 'https://example.com',
        publishedDate: '2021-01-01',
      },
    ];

    const query = normalizeQuery('drone delivery delivery');

    const keywordCounts = getKeywordCounts(papers, query);

    expect(keywordCounts).toEqual({
      drone: 1,
      delivery: 2,
    });
  });

  it('will not count any keywords if the query is empty', () => {
    const papers = [
      {
        id: '1',
        title: 'Drone Delivery',
        authors: [{ name: 'John Doe' }],
        abstract: 'This paper discusses the future of delivery.',
        links: [],
        downloadUrl: 'https://example.com',
        publishedDate: '2021-01-01',
      },
    ];

    const query = '';

    const keywordCounts = getKeywordCounts(papers, query);

    expect(keywordCounts).toEqual({});
  });
});
