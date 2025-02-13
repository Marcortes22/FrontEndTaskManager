export function GetCurrentPageQueryKey(pathname: string) {
  let queryKey: string = '';
  let queryKeyId: string = '';

  if (pathname) {
    // Lógica condicional basada en `pageLocation`, pero sin afectar los hooks
    if (pathname.split('/').length === 2) {
      switch (pathname) {
        case '/':
          queryKey = 'MyDayTasks';
          break;
        case '/important':
          queryKey = 'ImportantTasks';
          break;
        case '/planned':
          queryKey = 'PlannedTasks';
          break;
        case '/completed':
          queryKey = 'CompletedTasks';
          break;
        case '/all':
          queryKey = 'allTasks';
          break;
        default:
          break;
      }
      return { queryKey, queryKeyId };
    } else {
      const pageQueryKeyId = pathname.split('/')[2];
      queryKey = 'TaskList';
      queryKeyId = pageQueryKeyId;

      return { queryKey, queryKeyId };
    }
  }
  return { queryKey, queryKeyId };
}
