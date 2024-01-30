var lengthOfLongestSubstring = function (s) {
    if (s.length === 0) return 0;

    const charSet = new Set();
    let maxLength = 0;
    let left = 0;

    for (let right = 0; right < s.length; right++) {
        console.log({ right, left, maxLength, charSet });
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            console.log({
                message: `${s[left]} / ${s[right]} is deleted!`,
                right,
                left,
                maxLength,
                charSet,
            });
            left++;
        }
        charSet.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
};

lengthOfLongestSubstring("awokawokaokwakowokwaokaw");
