import axios, { AxiosError, AxiosResponse } from 'axios';


const requestHasBody = (method: string) => (
  ['post', 'put'].includes(method)
);

const NETWORK_ERROR = "A network error occurred.";
const UNEXPECTED_ERROR = "We could not complete your request."

/**
 * @see documentation: https://axios-http.com/docs/handling_errors
 **/
const handleRequestError = (error: AxiosError): void => {

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error("Network error:", error.response.data);
    console.error("Network error:", error.response.status);
    console.error("Network error:", error.response.headers);
    throw error;//new Error(DEFAULT_ERROR_MSG);
  }
  else if (error.request) {
    throw new Error(NETWORK_ERROR);
  }
  throw new Error(UNEXPECTED_ERROR);
}

/**
 * @method sendRequest
 * @type R - The response data type.
 * @return - Returns a promise that resolves with data of the specified type.
 **/
export const sendRequest = async <R>(
  method: string,
  url: string,
  body?: any,
  handleError?: (e: AxiosError) => void,
  headers?: { [key: string]: string }
): Promise<R> => {

  const options = {
    headers: {
      "content-type": "application/json",
      ...headers
    },
  };

  const params = (() => {
    const result: any[] = [url];
    if (requestHasBody(method)) result.push(body);
    result.push(options);
    return result;
  })();

  let promise;
  switch (method) {
    case 'get':
      promise = (axios.get<R>).apply(axios, params);
      break;
    case 'post':
      promise = (axios.post<R>).apply(axios, params);
      break;
    default:
      throw new Error('Invalid HTTP method.');
  }
  return promise.then((r: AxiosResponse) => r.data);
}

