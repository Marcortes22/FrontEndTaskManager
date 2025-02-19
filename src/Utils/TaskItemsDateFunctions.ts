import { TaskItemType } from '@/Types/TaskItem.type';
import { format, FormatStyle, isBefore, isEqual } from '@formkit/tempo';

export function validateTodayTask(TaskDate: Date | null): boolean {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    TaskDate != null &&
    isEqual(
      format(TaskDate, 'YYYY-MM-DD'),
      format({ date: TaskDate, format: 'YYYY-MM-DD', tz: timeZone }),
    )
  );
}

export function isOlder(taskDate: Date): boolean {
  const date = new Date();
  return isBefore(format(taskDate, 'YYYY-MM-DD'), format(date, 'YYYY-MM-DD'));
}

export function getTodayTasks(tasks: TaskItemType[]) {
  const date = new Date();

  return tasks.filter(
    (item) =>
      item.dueDate &&
      isEqual(format(item.dueDate, 'YYYY-MM-DD'), format(date, 'YYYY-MM-DD')),
  );
}

export function getDateToLocaleZoneDate(
  dateToFormat: Date,
  dateFormat: FormatStyle,
  timeFormat?: FormatStyle,
) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const locale = Intl.DateTimeFormat().resolvedOptions().locale;

  const dateFormated = format({
    date: dateToFormat,
    format: { date: dateFormat, time: timeFormat },
    tz: timeZone,
    locale: locale,
  });

  const dateFormatedTwo = format(dateToFormat, 'DD/MM/YY', 'es');

  if (dateFormat === 'short') {
    return dateFormatedTwo;
  }

  return dateFormated;
}
