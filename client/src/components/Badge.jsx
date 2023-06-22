import React from 'react'

const Badge = ({ status }) => {
  let bg
  let color
  if (status === 'yet to start') {
    bg = 'bg-[#F9C6FA]'
    color = 'text-[#641580]'
  } else if (status === 'ongoing') {
    bg = 'bg-[#DEFCE9]'
  } else if (status === 'completed') {
    bg = 'bg-[#FEF3C7]'
    color = 'text-[#B45309]'
  } else if (status === 'inactive') {
    bg = 'bg-[#F2CCD1]'
  } else if (status === 'active') {
    bg = 'bg-active-badge'
    color = 'text-[#27B310]'
  } else if (status === 'cancelled') {
    bg = 'bg-[#F2CCD1]'
    color = 'text-[#BF011B]'
  }

  let badge_style =
    bg +
    ' ' +
    color +
    ' py-[5px] px-[18px] font-semibold tracking-[-0.02rem] text-sm rounded-[4px]'
  return <span className={badge_style}>{status}</span>
}

export default Badge
