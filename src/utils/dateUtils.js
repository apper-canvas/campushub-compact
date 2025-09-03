import { format, isToday, isTomorrow, isThisWeek, parseISO, differenceInDays } from 'date-fns';

export const formatDate = (date, formatStr = 'MMM dd, yyyy') => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, formatStr);
};

export const formatTime = (time) => {
  return format(new Date(`1970-01-01T${time}`), 'h:mm a');
};

export const getDateLabel = (date) => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  
  if (isToday(parsedDate)) return 'Today';
  if (isTomorrow(parsedDate)) return 'Tomorrow';
  if (isThisWeek(parsedDate)) return format(parsedDate, 'EEEE');
  return format(parsedDate, 'MMM dd');
};

export const getDueDateUrgency = (dueDate) => {
  const parsedDate = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate;
  const daysUntilDue = differenceInDays(parsedDate, new Date());
  
  if (daysUntilDue < 0) return 'overdue';
  if (daysUntilDue === 0) return 'today';
  if (daysUntilDue <= 3) return 'urgent';
  if (daysUntilDue <= 7) return 'soon';
  return 'normal';
};

export const getGradeColor = (grade) => {
  if (grade >= 90) return 'text-success-600';
  if (grade >= 80) return 'text-info-600';
  if (grade >= 70) return 'text-accent-600';
  if (grade >= 60) return 'text-warning-600';
  return 'text-error-600';
};