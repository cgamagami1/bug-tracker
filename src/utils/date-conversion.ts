import { DateTime } from "luxon";
import { Timestamp } from "firebase/firestore";

export const timestampToDateTime = (date: Timestamp | null): DateTime | null => {
  if (date instanceof Timestamp) {
    return DateTime.fromJSDate(date.toDate());
  }
  
  return null;
}

export const dateTimeToTimestamp = (date: DateTime | null): Timestamp | null => {
  if (date instanceof DateTime) {
    return Timestamp.fromDate(date.toJSDate());
  }

  return null;
}