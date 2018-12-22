const faker = require('faker');

// Generate Item (num is total number of items), number of reviews is seeded as random for now
let generateItems = (num) => {
    let items = [];
    for (let i = 0; i < num; i++) {
        let itemObject = {
            itemName: faker.commerce.productName(),
            numberOfReviews: Math.floor(Math.random() * 10000 + 1),
            price: faker.commerce.price(),
            averageStarRating: Math.floor(Math.random() * (5 - 1) + 1),
            availableOnPrime: (Math.random() < .8),
            image: faker.image.business()
        };

        items.push(itemObject);
    }
    // console.log(items);
    return items; 
};

// Generate Random Reviews, creates num reviews over numItems randomly (each review will have a random item number)
let generateReviews = (num, numItems) => {
    let reviews = [];
    for (let i = 0; i < num; i++) {
        let reviewObject = {
            body: faker.lorem.sentence(),
            headline: faker.lorem.paragraph(),
            photoUrl: faker.image.image(),
            rating: Math.floor(Math.random() * (5 - 1) + 1),
            id_item: Math.floor(Math.random() * (numItems - 1) + 1)
        };
        reviews.push(reviewObject);
    }
    // console.log(reviews);
    return reviews;
};

// Generate Singles, Pairs or Trios of frequently together items by id 1 - 100
let generateFrequentlyTogether = (num) => {
    let rangeOfItems = [...Array(num + 1).keys()];
    rangeOfItems.shift();
    let returnArr = [];
    while (rangeOfItems.length > 0) {
        if (rangeOfItems.length > 3) {
            let randThroughThree = Math.floor(Math.random() * (3 - 1 ) + 1);
            let tempRandArr = [];
            for (let i = 0; i < randThroughThree; i++) {
                let randomItemIdIndex = Math.floor(Math.random() * (rangeOfItems.length - 1 ) + 0);
                if (randThroughThree !== 1) {
                    tempRandArr.push(rangeOfItems[randomItemIdIndex]);
                }
                rangeOfItems.splice(randomItemIdIndex, 1);               
            }

            let generatePairs = (arr) => {
                let pairsArr = [];
                if (arr.length === 1) {
                    pairsArr.push([arr[0]]);
                }
                for (let i = 0; i < arr.length; i++) {
                    for(let j = 0; j < arr.length; j++) {
                        if (i !== j) {
                            pairsArr.push([arr[i], arr[j]]);
                        }
                    }
                }
                return pairsArr;
            }
            returnArr = returnArr.concat(generatePairs(tempRandArr));

        } else {
            for (let i = 0; i < rangeOfItems.length; i++) {
                rangeOfItems.splice(i, 1);
            }
        }
        
    }
    return returnArr;
};

// Generate lists of related items for num items
let generateRelatedItems = (num) => {
    var rangeOfItems = [...Array(num + 1).keys()];
    rangeOfItems.shift();
    var returnArr = [];
    while (rangeOfItems.length > 0) {
        if (rangeOfItems.length > 20) {
            var randThroughThree = Math.floor(Math.random() * (20 - 1 ) + 1);
            var tempRandArr = [];

            for (var i = 0; i < randThroughThree; i++) {
                var randomItemIdIndex = Math.floor(Math.random() * (rangeOfItems.length - 1 ) + 0);
                tempRandArr.push(rangeOfItems[randomItemIdIndex]);
                rangeOfItems.splice(randomItemIdIndex, 1);  
            }

            var generatePairs = (arr) => {
                var pairsArr = [];
                if (arr.length === 1) {
                    pairsArr.push([arr[0]]);
                }
                for (var i = 0; i < arr.length; i++) {
                    for(var j = 0; j < arr.length; j++) {
                        if (i !== j) {
                            pairsArr.push([arr[i], arr[j]]);
                        }
                    }
                }
                return pairsArr;
            }
            returnArr = returnArr.concat(generatePairs(tempRandArr));

        } else if (rangeOfItems.length > 5) {
            var randThroughThree = Math.floor(Math.random() * (5 - 1 ) + 1);
            var tempRandArr = [];

            for (var i = 0; i < randThroughThree; i++) {
                var randomItemIdIndex = Math.floor(Math.random() * (rangeOfItems.length - 1 ) + 1);
                tempRandArr.push(rangeOfItems[randomItemIdIndex]);
                rangeOfItems.splice(randomItemIdIndex, 1);               
            }

            var generatePairs = (arr) => {
                var pairsArr = [];
                if (arr.length === 1) {
                    pairsArr.push([arr[0]]);
                }
                for (var i = 0; i < arr.length; i++) {
                    for(var j = 0; j < arr.length; j++) {
                        if (i !== j) {
                            pairsArr.push([arr[i], arr[j]]);
                        }
                    }
                }
                return pairsArr;
            }
            returnArr = returnArr.concat(generatePairs(tempRandArr));

        } else {
            for (var i = 0; i < rangeOfItems.length; i++) {
                // returnArr.push([rangeOfItems[i]]);
                rangeOfItems.splice(i, 1);
            }
        }
        
    }
    // console.log(returnArr);
    return returnArr;
};

// Generate up to 4 random features for num items (this has an id attached to it and I am not sure how to deal with this)
let generateFeatureRatings = (num) => {
    var featureRating = [];
    for (var i = 0; i < num; i++) {
        var featureObject = {
            typeOfFeature: faker.commerce.productAdjective(),
            rating: Math.floor(Math.random() * (4)),
            id_reviews: i
        }
        featureRating.push(featureObject);
    }
    return featureRating;
}
// Generate num questions
let generateQuestions = (num) => {
    let questionsArr = [];
    for (let i = 0; i < num; i++) {
        let question = {
            title: faker.hacker.phrase(),
            votes: Math.floor(Math.random() * (10-1)+1)
        }
        questionsArr.push(question);
    }
    return questionsArr;
}
// Generate num answers for numQuestions
let generateAnswers = (num, numQuestions) => {
    let answersArr = [];
    for (let i = 0; i < num; i++) {
        let answer = {
            body: faker.lorem.sentence(),
            username: faker.internet.userName(),
            seller: faker.random.boolean(),
            date: faker.date.past(),
            id_questions: Math.floor(Math.random() * (numQuestions - 1) + 1)
        }
        answersArr.push(answer);
    }
    // console.log(answersArr);
    return answersArr;
}




module.exports.generateItems = generateItems;
module.exports.generateReviews = generateReviews;
module.exports.generateFrequentlyTogether = generateFrequentlyTogether;
module.exports.generateRelatedItems = generateRelatedItems;
module.exports.generateFeatureRatings = generateFeatureRatings;
module.exports.generateQuestions = generateQuestions;
module.exports.generateAnswers = generateAnswers;

