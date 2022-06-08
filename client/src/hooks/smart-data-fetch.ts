import useSWR from 'swr';

import API from '../services/api';

type Filters = {
  [key: string]: any
}

function fetcher(url: string, filters: Filters): Promise<any> {
  return API.get(url, filters)
}

type UseSmartDataFetch<D = any> = {
  data: D;
  error: any,
  loading: boolean
}

export function useSmartDataFetch<D = any>(url: string, filters: Filters = {}): UseSmartDataFetch<D> {
  const { data, error } = useSWR([url, filters], fetcher, { revalidateOnFocus: false });
  return {
    data,
    error,
    loading: !data && !error
  }
}