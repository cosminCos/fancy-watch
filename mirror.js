const getTime = () => {
    const time = new Date();
    const hours = time.getHours()
    const minutes = time.getMinutes();
    const seconds = time.getSeconds()
    console.log(
        convertHourToName(hours), ':', convertNumberToName(minutes), ':', convertNumberToName(seconds)
    )
    setTimeout(() => {
        getTime()
    }, 60000);
}

const addZero = i => {
    if (i < 10) {
        i = '0' + i;
    }
    return Number(i);
}

const convertHourToName = num => {
    if (num > 12) {
        num -= 12;
    }
    return convertNumberToName(num);
}

const convertNumberToName = num => {
    const lowNames = ["zero", "one", "two", "three",
        "four", "five", "six", "seven", "eight", "nine",
        "ten", "eleven", "twelve", "thirteen", "fourteen",
        "fifteen", "sixteen", "seventeen",
        "eighteen", "nineteen"
    ];
    const tensNames = ["twenty", "thirty", "forty", "fifty",
        "sixty", "seventy", "eighty", "ninety"
    ];

    let tens;
    let ones;
    let result;

    if (num < lowNames.length) {
        result = lowNames[num];
    } else {
        tens = Math.floor(num / 10);
        ones = num % 10;
        if (tens <= 9) {
            result = tensNames[tens - 2];
            if (ones > 0) {
                result += "-" + lowNames[ones];
            }
        } else {
            result = "unknown"
        }
    }
    return result;
}

const letters = 'abcdefghijklmnopqrstuvwxyz';

getTime()