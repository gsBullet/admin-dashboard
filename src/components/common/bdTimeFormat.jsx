import React from 'react'

const bdTimeFormat = (date) => {
  return new Date(date).toLocaleString("en-BD", {
    timeZone: "Asia/Dhaka",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default bdTimeFormat