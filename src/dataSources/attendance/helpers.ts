function convertMsToHM(milliseconds: number) {
  let seconds = milliseconds / 1000;
  let minutes = seconds / 60;
  let hours = minutes / 60;

  return parseFloat(hours.toFixed(2));
}

export { convertMsToHM };
