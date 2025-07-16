import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";

import { Box, Typography, Paper } from "@mui/material";

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const calendarEvents = response.data.map((task) => ({
          title: task.title,
          date: task.deadline,
        }));
        setEvents(calendarEvents);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 2, md: 4 },
        bgcolor: "#f0f2f5",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        "::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(255, 255, 255, 0.8)",
          zIndex: 0,
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          color="primary"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          📅 Task Calendar
        </Typography>

        <Paper
          elevation={5}
          sx={{
            maxWidth: 1000,
            margin: "0 auto",
            p: 3,
            borderRadius: 3,
            backgroundColor: "#ffffffdd",
            boxShadow: 3,
            overflowX: "auto",
          }}
        >
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            height="auto"
            contentHeight="auto"
            dayMaxEventRows={true}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek,dayGridDay",
            }}
            eventColor="#1976d2"
            dayHeaderClassNames={() => "fc-day-header"}
            eventDisplay="block"
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default Calendar;
