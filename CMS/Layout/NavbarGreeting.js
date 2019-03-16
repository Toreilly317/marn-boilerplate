const NavbarGreeting = props => {
  const today = new Date()
  const curHr = today.getHours()
  let greeting

  if (curHr < 12) {
    greeting = 'good morning,'
  }
  else if (curHr < 18) {
    geeting = 'good afternoon,'
  }
  else {
    greeting = 'good evening,'
  }

  return greeting
}

export default NavbarGreeting
