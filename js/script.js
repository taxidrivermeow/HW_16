const database = [
    {id: 1, name: "John", country: "Israel", age: 19, isMarried: true},
    {id: 2, name: "Mary", country: "Israel", age: 29, isMarried: false},
    {id: 3, name: "Bill", country: "Belgium", age: 10, isMarried: false},
    {id: 4, name: "Jane", country: "France", age: 30, isMarried: true},
    {id: 5, name: "Hanna", country: "France", age: 9, isMarried: false},
    {id: 6, name: "George", country: "Israel", age: 80, isMarried: true}
];

let sortByAgeDirection = 1;
let sortByIsMarriedDirection = 1;
let sortByNameDirection = 1;
let sortByCountryDirection = 1;
let actualArr = [];

function tableRender(array, isSort = 0) {
    actualArr = [...array];
    let averageAge = 0;
    let personCount = 0;
    const tableHeader = '<tr class="table-active">' +
        '<th>#</th>' +
        '<th><a href="#" onclick="sortByWord(actualArr, \'name\')">Name</a></th>' +
        '<th><a href="#" onclick="sortByWord(actualArr, \'country\')">Country</a></th>' +
        '<th><a href="#" onclick="sortByNumber(actualArr, \'age\')">Age</a></th>' +
        '<th><a href="#" onclick="sortByNumber(actualArr, \'isMarried\')">isMarried</a></th>' +
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
            '<td><a href="#" onclick="deleteUser(database, ' + value.id + ')">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">' +
            '<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>' +
            '</svg></a></td>' +
            '</tr>';
    });
    const averageString = '<tr class="table-active"><td></td><td><b>Average</b></td><td></td><td>' + (averageAge / personCount) + '</td><td></td><td></td></tr>';

    document.getElementById('database-table').innerHTML = tableHeader + str.join('') + averageString;

    if (!isSort) {
        showCountryStat(1);
        showCountryStat(0);
    }
}

function statTableRender(array, isFullStat) {
    const countries = Object.keys(array);
    const captionText = (isFullStat)? 'Full data stat': 'Current table stat';
    const tableHeader = '<caption>' + captionText + '</caption>' +
        '<tr class="table-active">' +
        '<th>#</th>' +
        '<th>Country</th>' +
        '<th>Count</th></tr>';

    const str = countries.map(function (value, index){
        return '<tr>' +
            '<td>' + (index + 1) + '</td>' +
            '<td>' + value + '</td>' +
            '<td>' + array[value] + '</td>';
    });

    const tablePaste = (isFullStat)? 'full-country-stat-table' : 'current-country-stat-table';
    document.getElementById(tablePaste).innerHTML = tableHeader + str.join('');
}

function sortByWord(array, column) {
    let sortedArr = [];
    let returnValue = 1;
    let columnName = '';
    if (column === 'name') {
        returnValue = (sortByNameDirection)?1:-1;
        sortByNameDirection = !sortByNameDirection;
        columnName = 'name';
    }

    if (column === 'country') {
        returnValue = (sortByCountryDirection)?1:-1;
        sortByCountryDirection = !sortByCountryDirection;
        columnName = 'country';
    }

    sortedArr = array.sort(function (a, b) {
        const firstWord = a[columnName].toLowerCase();
        const secondWord = b[columnName].toLowerCase();

        if (firstWord > secondWord) return returnValue;
        if (firstWord < secondWord) return -returnValue;
        if (firstWord === secondWord) return 0;
    });

    tableRender(sortedArr, 1);
}

function sortByNumber(array, column) {
    let sortedArr = [];
    let columnName = '';
    let sortDirection = 1;

    if (column === 'age') {
        sortDirection = sortByAgeDirection;
        sortByAgeDirection = !sortByAgeDirection;
        columnName = 'age';
    }

    if (column === 'isMarried') {
        sortDirection = sortByIsMarriedDirection;
        sortByIsMarriedDirection = !sortByIsMarriedDirection;
        columnName = 'isMarried';
    }

    if (sortDirection) {
        sortedArr = array.sort(function (a, b) {
            return a[columnName] - b[columnName];
        });
    } else {
        sortedArr = array.sort(function (a, b) {
            return b[columnName] - a[columnName];
        });
    }

    tableRender(sortedArr, 1);
}

function deleteUser(array, id) {
    let delIndex = 0;
    array.forEach(function (value, index) {
        if (value.id === id) {
            delIndex = index;
        }
    });
    array.splice(delIndex, 1);

    delIndex = 0;
    actualArr.forEach(function (value, index) {
        if (value.id === id) {
            delIndex = index;
        }
    });
    actualArr.splice(delIndex, 1)

    tableRender(actualArr);
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

function showAll(array) {
    tableRender(array);
}

function showCountryStat(isFullStat) {
    const array = isFullStat ? database : actualArr;
    const countryArr = array.reduce(function (accumulator, value) {
        if(accumulator[value.country] === undefined) {
            accumulator[value.country] = 1;
        } else {
            accumulator[value.country]++;
        }
        return accumulator;
    }, {});

    statTableRender(countryArr, isFullStat);
}

onload(tableRender(database));

