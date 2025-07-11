const useData = () => {
  const csvUrl =
    '<script src="https://gist.github.com/gnevercodes/92c873c9c420292af7be5d9f3b4b372b.js"></script>';

  return d3.csv(csvUrl).then((data) => {
    // Parse the population value to number
    const parsedData = data.map((d) => ({
      country: d.Country,
      population: +d.Population2020, // Convert string to number
    }));

    console.log("First few data points:", parsedData.slice(0, 3)); // Debug data

    // Sort by population in descending order and take top 30
    return parsedData.sort((a, b) => b.population - a.population).slice(0, 30);
  });
};
