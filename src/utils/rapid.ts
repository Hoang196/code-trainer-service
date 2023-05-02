import axios, { AxiosRequestConfig } from 'axios';
import logger from 'logger';

const requestRapidResource = async (endpoint: string, requestConfig?: AxiosRequestConfig): Promise<any> => {
  logger.info(`Calling Rapid API:${endpoint} data:${JSON.stringify(requestConfig?.data)} `);
  console.log({
    ...requestConfig,
    url: endpoint,
  });
  const rapidResponse = await axios({
    ...requestConfig,
    url: endpoint,
  });
  logger.info(`Rapid response for ${endpoint}`);
  return rapidResponse?.data;
};

export default requestRapidResource;
