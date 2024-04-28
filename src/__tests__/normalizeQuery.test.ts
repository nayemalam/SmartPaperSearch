import { normalizeQuery } from '../helpers';

describe('normalizeQuery', () => {
  it('ensure space around AND and OR', () => {
    const query = 'droneanddelivery';
    const result = normalizeQuery(query);
    expect(result).toBe('drone and delivery');
  });

  it('Ensure space around parentheses', () => {
    const query = 'droneand(delivery)';
    const result = normalizeQuery(query);
    expect(result).toBe('drone and ( delivery )');
  });

  it('should normalize query that have many blank spaces', () => {
    const query = 'drone     and      delivery';
    const result = normalizeQuery(query);
    expect(result).toBe('drone and delivery');
  });
});
