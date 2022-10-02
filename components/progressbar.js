import {
  addMinutes,
  differenceInMilliseconds,
  differenceInMinutes,
  format,
} from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import { intervalToDuration } from "date-fns/fp";
import { fr } from "date-fns/locale";

export const getUserTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const convertDateToUserTimeZone = (strDate) => {
  let convertedDate;
  try {
    const zonedToUtc = zonedTimeToUtc(strDate, "UTC");
    convertedDate = utcToZonedTime(zonedToUtc, getUserTimeZone());
  } catch (e) {
    return new Date();
  }

  return convertedDate;
};

export const heureDebut = (dateStr) => {
  let formatedDate;

  try {
    let userDate = convertDateToUserTimeZone(dateStr);
    formatedDate = format(userDate, "HH:mm", { locale: fr });
  } catch (e) {
    return "No date";
  }

  return formatedDate;
};

export const get_Duration = (duration) => {
  let label = "";
  try {
    let interval = intervalToDuration({ start: 0, end: duration * 60000 });
    if (interval.hours > 0 && interval.minutes > 0) {
      label = interval.hours + " h " + interval.minutes + " min";
    } else if (interval.hours > 0 && interval.minutes === 0) {
      label = interval.hours + " h";
    } else if (interval.hours === 0 && interval.minutes > 0) {
      label = interval.minutes + " min";
    }
    return label;
  } catch (e) {
    return "";
  }
};

export const getPercentage = (startTime, duration) => {
  const currentDate = Date.now();
  const startDate = convertDateToUserTimeZone(startTime);
  const endDate = addMinutes(startDate, duration);

  const left = differenceInMilliseconds(currentDate, startDate);
  const right = differenceInMilliseconds(endDate, startDate);
  const passedTime = differenceInMinutes(currentDate, startDate);

  let progressValue = Math.round((left / right) * 100);
  progressValue = progressValue >= 100 ? 100 : progressValue;

  let labelPosition = 0;
  let progressLabel = get_Duration(passedTime);

  if (progressValue < 0) {
    progressValue = 0;
    progressLabel = "";
  }

  if (progressValue <= 10 && progressValue > 0) {
    progressValue = 30;
  }

  if (progressValue > 100) {
    labelPosition = 100;
    progressValue = 100;
  } else if (progressValue > 5 && progressValue < 100) {
    labelPosition = progressValue;
  } else {
    labelPosition = progressValue;
  }

  if (labelPosition === 100) {
    progressLabel = "";
  } else if (labelPosition > 5 || labelPosition < 100) {
    progressLabel = progressLabel;
  }

  return {
    percentage: progressValue,
    labelPosition: labelPosition,
    progressLabel: progressLabel,
  };
};

export function print_Time(m) {
  if (m < 60 && m > 0) {
    return m + "mn";
  }
  return (
    Math.floor(m / 60) + "h" + (m % 60 < 10 ? "0" + (m % 60) : m % 60) + "mn"
  );
}
