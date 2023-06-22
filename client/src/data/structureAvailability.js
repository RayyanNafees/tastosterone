export const structureAvailability = (data) => {
  // const availability = ""

  const availabilities = data.map((data) => {
    const [day, from, to] = data
    return `${day}, ${from} - ${to} `
  })
  return availabilities
}
