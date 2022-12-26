const database = [
    {name: "John", country: "Israel", age: 19, isMarried: true},
    {name: "Mary", country: "Israel", age: 29, isMarried: false},
    {name: "Bill", country: "Belgium", age: 10, isMarried: false},
    {name: "Jane", country: "France", age: 30, isMarried: true},
    {name: "Hanna", country: "France", age: 9, isMarried: false},
    {name: "George", country: "Israel", age: 80, isMarried: true}
];

let sortByAgeDirection = 1;
let sortByIsMarriedDirection = 1;
let sortByNameDirection = 1;
let sortByCountryDirection = 1;
// let sortedArr = [];

function tableRender(array) {
    let averageAge = 0;
    let personCount = 0;
    const tableHeader = '<tr>' +
        '<th>#</th>' +
        '<th><a href="#" onclick="sortByName(database)">Name</a></th>' +
        '<th><a href="#" onclick="sortByCountry(database)">Country</a></th>' +
        '<th><a href="#" onclick="sortByAge(database)">Age</a></th>' +
        '<th><a href="#" onclick="sortByIsMarried(database)">isMarried</a></th>' +
        '<th>Delete</th></tr>';
    const str = array.map(function (value, index) {
        averageAge += value.age;
        personCount++;
        return '<tr>' +
            '<td>' + (index + 1) + '</td>' +
            '<td>' + value.name + '</td>' +
            '<td>' + value.country + '</td>' +
            '<td>' + value.age + '</td>' +
            '<td>' + value.isMarried +'</td>' +
            '<td><a href="#" onclick="deleteUser(database, ' + index + ')">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">' +
            '<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>' +
            '</svg></a></td>' +
            '</tr>';
    });
    const averageString = '<tr><td></td><td><b>Average</b></td><td></td><td>' + (averageAge / personCount) + '</td><td></td></tr>';

    document.getElementById('database-table').innerHTML = tableHeader + str.join('') + averageString;
}

function sortByName(array) {
    let sortedArr = [];
    if (sortByNameDirection){
        sortByNameDirection = 0;
        sortedArr = array.sort(function (a, b) {
            const firstName = a.name.toLowerCase();
            const secondName = b.name.toLowerCase();

            if (firstName > secondName) return 1;
            if (firstName < secondName) return -1;
            if (firstName === secondName) return 0;
        });
    } else {
        sortByNameDirection = 1;
        sortedArr = array.sort(function (a, b) {
            const firstName = a.name.toLowerCase();
            const secondName = b.name.toLowerCase();

            if (firstName > secondName) return -1;
            if (firstName < secondName) return 1;
            if (firstName === secondName) return 0;
        });
    }

    tableRender(sortedArr);
}

function sortByCountry(array) {
    let sortedArr = [];
    if (sortByCountryDirection){
        sortByCountryDirection = 0;
        sortedArr = array.sort(function (a, b) {
            const firstCountry = a.country.toLowerCase();
            const secondCountry = b.country.toLowerCase();

            if (firstCountry > secondCountry) return 1;
            if (firstCountry < secondCountry) return -1;
            if (firstCountry === secondCountry) return 0;
        });
    } else {
        sortByCountryDirection = 1;
        sortedArr = array.sort(function (a, b) {
            const firstCountry = a.country.toLowerCase();
            const secondCountry = b.country.toLowerCase();

            if (firstCountry > secondCountry) return -1;
            if (firstCountry < secondCountry) return 1;
            if (firstCountry === secondCountry) return 0;
        });
    }

    tableRender(sortedArr);
}

function sortByAge(array) {
    let sortedArr = [];
    if (sortByAgeDirection) {
        sortByAgeDirection = 0;
        sortedArr = array.sort(function (a, b) {
            return a.age - b.age;
        });
    } else {
        sortByAgeDirection = 1;
        sortedArr = array.sort(function (a, b) {
            return b.age - a.age;
        });
    }

    tableRender(sortedArr);
}

function sortByIsMarried(array) {
    let sortedArr = [];
    if (sortByIsMarriedDirection) {
        sortByIsMarriedDirection = 0;
        sortedArr = array.sort(function (a, b) {
            return a.isMarried - b.isMarried;
        });
    } else {
        sortByIsMarriedDirection = 1;
        sortedArr = array.sort(function (a, b) {
            return b.isMarried - a.isMarried;
        });
    }

    tableRender(sortedArr);
}

function deleteUser(array, index) {
    array.splice(index, 1);
    tableRender(array);
}

function showMarriedOnly(array){
    let sortedArr = array.filter(function (value) {
        if (value.isMarried) return value;
    });

    tableRender(sortedArr);
}

function showUnmarriedOnly(array){
    let sortedArr = array.filter(function (value) {
        if (!value.isMarried) return value;
    });

    tableRender(sortedArr);
}

onload(tableRender(database));