import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { DateNonYearHook } from "../../../../../lib/hook/dateChangeHook";
import { DatePeriodChangeHook } from "../../../../../lib/hook/datePeriodChangeHook";
import { DateSplitHook } from "../../../../../lib/hook/dateSplitHook";
import { attendanceData } from "../../../../../modules/atom/attendance";
import {
  calendarEndModal,
  calendarModal,
  endDateValue,
  startDateValue,
} from "../../../../../modules/atom/calendar";
import { EnrollmentItem } from "../style";
import CalendarEndModal from "./CalendarEndModal";
import CalendarModal from "./CalendarModal";
import * as S from "./style";

const CalendarItem = () => {
  const setOpen = useSetRecoilState(calendarModal);
  const setSecOpen = useSetRecoilState(calendarEndModal);

  const [attendance, setAttendance] = useRecoilState(attendanceData);
  const startDate = useRecoilValue(startDateValue);
  const endDate = useRecoilValue(endDateValue);
  const [dateValue, setDateValue] = useState<any>(DateSplitHook(startDate));
  const [dateSecValue, setDateSecValue] = useState<any>(DateSplitHook(endDate));

  const [date, setDate] = useState({
    startDate: startDate.format("YYYY-MM-DD"),
    endDate: endDate.format("YYYY-MM-DD"),
    startPeriod: "",
    endPeriod: "",
  });

  useEffect(() => {
    setDateValue(DateNonYearHook(startDate.format("MM-DD")));
    setDateSecValue(DateNonYearHook(endDate.format("MM-DD")));
  }, [date, startDate, dateValue, endDate]);

  useEffect(() => {
    setAttendance({
      ...attendance,
      term: DatePeriodChangeHook(date),
    });
  }, [date]);

  useEffect(() => {
    setDate({
      ...date,
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
    });
  }, [startDate, endDate]);

  return (
    <>
      <CalendarModal />
      <CalendarEndModal />
      <EnrollmentItem>
        <S.SubTitle>날짜</S.SubTitle>
        <S.DateWrapper>
          <div className="date_item_wrap">
            <span onClick={() => setOpen(true)}>{dateValue}</span>
            <div className="date_period">
              <input
                type="text"
                placeholder="_"
                onChange={(e) =>
                  setDate({
                    ...date,
                    startPeriod: e.target.value,
                  })
                }
              />
              <span>교시 ~ </span>
            </div>
          </div>
          <div className="date_item_wrap">
            <span onClick={() => setSecOpen(true)}>{dateSecValue}</span>
            <div className="date_period">
              <input
                type="text"
                placeholder="_"
                onChange={(e) =>
                  setDate({
                    ...date,
                    endPeriod: e.target.value,
                  })
                }
              />
              <span>교시</span>
            </div>
          </div>
        </S.DateWrapper>
      </EnrollmentItem>
    </>
  );
};

export default CalendarItem;
