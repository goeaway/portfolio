I kept seeing flashy forms on places like dribbble.com and wanted to try one out for myself. I picked a card details form because it requires some interesting validation for the long number and as it's associated with a physical thing offers an opportunity for an interesting concept.

The whole thing is built in react, probably a bit overkill for what we're doing here, but the experience of working in modern react with hooks is so enjoyable I find it pretty hard to not pick it up for everything.

I started with the long number validation, which uses the [Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm) to ensure the number is correct. This isn't just used to stop the user from getting their number wrong but to avoid a user accidently _correctly_ guessing all the details of someone else's card and being able to pay with it!


The algorithm is below and basically involves a calculation on all the numbers apart from the last, which is then validated against the last digit.

```
export const validate = (number: string) : boolean => {
    if(!number || number.length < 13 || number.length > 19){
        return false;
    } 

    // create an array of ints from the string
    const array = number.split("").reverse().map(n => parseInt(n));

    if(array.some(n => isNaN(n))) {
        return false;
    }

    // first digit is the check (since we reversed the number)
    // take it out now
    const checkDigit = array.splice(0, 1)[0];

    // for every even indexed number in the array, multiply it by 2, if the result of that is greater than nine,
    // minus 9 from the result, sum result with non multiplied numbers too
    const sum = array.reduce((acc, cur, index) =>
        index % 2 == 0 ? acc + (cur * 2 > 9 ? cur * 2 - 9 : cur * 2) : acc + cur, 0);

    // add the sum and check and then get the modulus of 10, if result is zero we have a valid number    
    return (sum + checkDigit) % 10 === 0;
}
```

Once the long number validation was done, the other inputs only really required simple validation checking for values, the expiry required a little bit just to check it's not in the past and is a valid date, momentjs makes this kind of validation pretty trivial though.

Once the form was functional, I simply created a card component which took a few props in for the values, then added some css transitions to get the card to flip when the user focused the CVV input, and back again when not.

I think this could be a really nice addition into a payment form of some kind and all in all doesn't take very long at all to implement, perhaps a few more animations could take it to the next level.
