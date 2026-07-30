import React from 'react'

export default function Header() {
  return (
      <div className="flex items-center justify-between gap-2">
          <img src="/logo.svg" alt="Logo" className="w-50 h-15" />
          <TopLeft />
    </div>
  )
}

const TopLeft = () => {
    return (
      <section className="flex items-center p-3 px-5 gap-3 rounded-[10px] bg-[#272541]">
        <img src="/icon-units.svg" alt="Units" className="w-6 h-6" />
        <h3>Units</h3>
        <img src="/icon-dropdown.svg" alt="Units" className="w-6 h-6" />
      </section>
    );
}