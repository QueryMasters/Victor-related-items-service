const faker = require('faker');

// Generate Item Reviews
var generateItems = (num) => {
    var items = [];
    for (var i = 0; i < num; i++) {
        var itemObject = {
            itemId: i,
            itemName: faker.commerce.productName(),
            price: faker.commerce.price(),
            averageStars: Math.floor(Math.random() * (5-1)+1),
            availableOnPrime: (Math.random() < .8),
            image: faker.image.business()
        };

        items.push(itemObject);
    }

    console.log(items)
    return items; 
};

// Generate Random Reviews
var generateReviews = (num) => {
    var reviews = [];
    for (var i = 0; i < num; i++) {
        var reviewObject = {
            text: faker.lorem.sentence(),
            headline: faker.lorem.paragraph(),
            photoUrl: faker.image.image(),
            rating: Math.floor(Math.random() * (5-1)+1),
            item_id: Math.floor(Math.random() * 99 + 1)
        };
        reviews.push(reviewObject);
    }
    console.log(reviews);
    return reviews;
};

// Generate Singles, Pairs or Trios of frequently together items by id 1 - 100
var generateFrequentlyTogether = (num) => {
    var rangeOfItems = [...Array(num + 1).keys()];
    rangeOfItems.shift();
    var returnArr = [];
    while (rangeOfItems.length > 0) {
        if (rangeOfItems.length > 3) {
            var randThroughThree = Math.floor(Math.random() * (3 - 1 ) + 1);
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
                returnArr.push([rangeOfItems[i]]);
                rangeOfItems.splice(i, 1);
            }
        }
        
    }
    return returnArr;
};

// Generate lists of related items
var generateRelatedItems = (num) => {
    var rangeOfItems = [...Array(num + 1).keys()];
    rangeOfItems.shift();
    var returnArr = [];
    while (rangeOfItems.length > 0) {
        if (rangeOfItems.length > 20) {
            var randThroughThree = Math.floor(Math.random() * (20 - 1 ) + 1);
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
                returnArr.push([rangeOfItems[i]]);
                rangeOfItems.splice(i, 1);
            }
        }
        
    }
    console.log(returnArr);
    return returnArr;
};

var generateFeatureRatings = (num) => {
    var featureRating = [];
    for (var i = 0; i < num; i++) {
        var featureObject = {
            typeOfFeature: faker.commerce.productAdjective(),
            rating: Math.floor(Math.random() * (5-1)+1),
            rating_id: i
        }
        featureRating.push(featureObject);
    }
    return featureRating;
}

var generateQuestions = (num) => {
    var questionsArr = [];
    for (var i = 0; i < num; i++) {
        var question = {
            title: faker.hacker.phrase(),
            votes: Math.floor(Math.random() * (10-1)+1)
        }
        questionsArr.push(question);
    }
    return questionsArr;
}


var generateAnswers = (num) => {
    var answersArr = [];
    for (var i = 0; i < num; i++) {
        var answer = {
            text: faker.lorem.sentence(),
            username: faker.internet.userName(),
            date: new Date(),
            seller: faker.random.boolean(),
            id_questions: Math.floor(Math.random() * 99 + 1)
        }
        answersArr.push(answer);
    }
    return answersArr;
}
// 

// generateItems(10);
// generateReviews(10);
// generateFrequentlyTogether(10);
// generateFrequentlyTogether(100);
// generateRelatedItems(1000);