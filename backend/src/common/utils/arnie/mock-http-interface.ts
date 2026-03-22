const urlPrefix = 'http://www.advantageair.com.au';

const urlToResponseLookup: Record<string, string> = {
  [`${urlPrefix}/arnie0`]: 'Get to the chopper',
  [`${urlPrefix}/arnie1`]: 'MY NAME IS NOT QUAID',
  [`${urlPrefix}/arnie2`]: "What's wrong with Wolfie?",
};

const httpRequestMockP = (url: string): Promise<string> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const responseData = urlToResponseLookup[url];

      if (responseData) {
        resolve(responseData);
      } else {
        reject(new Error('Your request has been terminated'));
      }
    }, 200);
  });

export interface HttpGetResponse {
  status: number;
  body: string;
}

export const httpGet = async (url: string): Promise<HttpGetResponse> => {
  try {
    const message = await httpRequestMockP(url);

    return { status: 200, body: JSON.stringify({ message }) };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';

    return { status: 500, body: JSON.stringify({ message: errorMessage }) };
  }
};
