import React from 'react'
import Header from '../sections/Header'
import Hero from '../sections/Hero'
import Main from '../sections/Main'

export default function Home() {
  const [tempUnit, setTempUnit] = React.useState("C");
  const [windSpeedUnit, setWindSpeedUnit] = React.useState("mph");
  const [precipitationUnit, setPrecipitationUnit] = React.useState("mm");
  return (
    <section className="flex flex-col gap-23">
      <Header setTempUnit={setTempUnit} setWindSpeedUnit={setWindSpeedUnit} setPrecipitationUnit={setPrecipitationUnit} />
      <Hero />
      <Main tempUnit={tempUnit} windSpeedUnit={windSpeedUnit} precipitationUnit={precipitationUnit} />
    </section>
  )
}
