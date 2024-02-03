import axios from 'axios';

type MethodApi = 'GET' | 'POST' | 'DELETE';

async function useApi(url: string, method: MethodApi, body = null) {
 let request;

 switch (method) {
    case 'GET':
      request = axios.get(url);
      break;
    case 'POST':
      request = axios.post(url, body);
      break;
    case 'DELETE':
      request = axios.delete(url, {data: body});
      break;
    default:
      throw new Error(`Método ${method} no soportado`);
 }

 try {
    const response = await request;
    return {data: response.data, loading: false, error: null};
 } catch (error) {
    return {data: null, loading: false, error};
 }
}

export default useApi;
