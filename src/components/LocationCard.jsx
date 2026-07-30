import React from 'react'

export default function LocationCard({ city, Country, date, tempUnit, tempValue, icon }) {
  return (
    <div>
      <h2>{city}, {Country}</h2>
      <p>{date.toLocaleDateString()}</p>
      <p>Temperature: {tempValue}°{tempUnit}</p>
      <p>Icon: {icon}</p>
    </div>
  )
}
