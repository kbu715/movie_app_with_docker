import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

function ReservationsCalendar() {
  const [Reservation, setReservation] = useState([]);

  useEffect(() => {
    axios
      .post("/api/reservation/getList")
      .then((response) => {
        if (response.data.success) {
          console.log("성공", response.data.doc);
          setReservation(response.data.doc);
        } else {
          console.log("실패");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const events = Reservation.map((item) => ({
    title: item.title,
    // date: `${item.year}-${item.month}-${item.day}}`,
    // date: item.selectDay.year - `${item.selectDay.Month}` - item.selectDay.day,
    date: item.createdAt,
  }));

  return (
    <FullCalendar
      defaultView="dayGridMonth"
      header={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
      }}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      // events={[{ title: "test", date: "2020-07-30" }]}
      events={events}
    />
  );
}

export default ReservationsCalendar;