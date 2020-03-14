exports.handler = async event => {
  const cache = {};
  const keypad = [
    ["0"],
    ["1"],
    ["A", "B", "C"],
    ["D", "E", "F"],
    ["G", "H", "I"],
    ["J", "K", "L"],
    ["M", "N", "O"],
    ["P", "Q", "R", "S"],
    ["T", "U", "V"],
    ["W", "X", "Y", "Z"]
  ];

  const calculateCombinations = (phoneNumber, keypad, cache) => {
    const input = [...phoneNumber];
    let output = [];

    for (let ch of keypad[input[0]]) {
      output.push(ch);
    }

    for (let i = 1; i < input.length; i++) {
      const prevList = [...output];
      output = [];

      for (let ch of keypad[input[i]]) {
        for (let s of prevList) {
          output.push(s + ch);
        }
      }
    }
    cache[phoneNumber] = output;
    return output;
  };

  const request = event.body ? JSON.parse(event.body) : event;

  const combinations = cache[request.phoneNumber]
    ? cache[request.phoneNumber]
    : calculateCombinations(request.phoneNumber, keypad, cache);

  return JSON.stringify({
    total: combinations.length,
    combinations: combinations.slice(
      request.start,
      request.start + request.numberOfRecords
    )
  });
};
