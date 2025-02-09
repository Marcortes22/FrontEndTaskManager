import { QueryClient } from '@tanstack/react-query';
import { GetCurrentPageQueryKey } from './GetCurrentPageQueryKey';

export function InvalidateQueries(
  queryClient: QueryClient,
  pathName: string,
  queriesToInvalidate?: string[],
) {
  try {
    const { queryKey, queryKeyId } = GetCurrentPageQueryKey(pathName);

    if (queryKey) {
      queryClient.invalidateQueries({ queryKey: ['taskListInformation'] });

      queriesToInvalidate?.forEach((query) => {
        queryClient.invalidateQueries({ queryKey: [query] });
      });

      if (queryKeyId) {
        queryClient.invalidateQueries({ queryKey: [queryKey, queryKeyId] });
        return;
      }
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    }
  } catch (e) {
    console.log(e);
  }
}
