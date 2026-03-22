import { getArnieQuotes } from './get-arnie-quotes';

const urls = [
  'http://www.advantageair.com.au/arnie0',
  'http://www.advantageair.com.au/arnie1',
  'http://www.advantageair.com.au/arnie2',
  'http://www.advantageair.com.au/arnie3',
];

test('expect no throws', async () => {
  await expect(getArnieQuotes(urls)).resolves.toBeDefined();
});

test('responses to be correct', async () => {
  const results = await getArnieQuotes(urls);

  expect(results.length).toBe(4);
  expect(results[0]).toEqual({ 'Arnie Quote': 'Get to the chopper' });
  expect(results[1]).toEqual({ 'Arnie Quote': 'MY NAME IS NOT QUAID' });
  expect(results[2]).toEqual({ 'Arnie Quote': "What's wrong with Wolfie?" });
  expect(results[3]).toEqual({ FAILURE: 'Your request has been terminated' });
});

test('code to be executed in less than 400ms', async () => {
  const startTime = process.hrtime();

  await getArnieQuotes(urls);

  const [seconds, nanos] = process.hrtime(startTime);

  expect(seconds).toBe(0);
  expect(nanos / 1000 / 1000).toBeLessThan(400);
});
