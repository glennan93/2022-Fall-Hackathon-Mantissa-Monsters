const canvasElement = document.getElementById("pomodoro-chart");

const xValues = ["test1", "test2", "test3", "test4"]; // update from database with array of courses for default date range
const yValues = [1, 2, 3, 4]; // update with array of course pomodoros for default date range
const dates = ["2022-01-01", "2022-02-01", "2022-03-01", "2022-04-01", "2022-05-01", ]; // list of all dates user has inputted pomodoros for, will be filtered later

const barColors = ['rgb(255, 99, 132, 0.2)', 'rgb(0, 255, 0, 0.2']; // can add more, color alternates each bar
const barMarginColors = ['rgb(255, 99, 132)', 'rgb(0, 255, 0)'];

const data = {
    labels: xValues,
    datasets: [{
        label: "Pomodoros",
        backgroundColor: barColors,
        borderColor: barMarginColors,
        borderWidth: 2,
        data: yValues
    }]
}

const config = {
    type: "bar",
    data: data,
        options: {
            plugins: {
                legend: {display: false},
                title: {
                    display: true,
                    text: "Pomodoros",
                    font: {
                        size: 30,
                    }
                }
            },
            scales: {
                y: {
                    suggestedMax: 10
                }
            }
        }
    };

const myChart = new Chart(canvasElement, config);

// Function to update chart when user selects new date range. Also will need to be updated when user completes
// a pomodoro.
function updateChart(){
    const openingDate = new Date(document.getElementById("opening-date").value);
    const closingDate = new Date(document.getElementById("closing-date").value);
    
    // Filters default dates array to give new array of dates range where user has pomodoros
    filteredDates = dates.filter((date) => (openingDate.getTime() <= new Date(date).getTime() && new Date(date).getTime() <= closingDate.getTime()));

    // Update pomodoro amounts for new date range
    myChart.data.datasets[0].data = [2,3,4,6];

    // Update courses studied within new date range 
    myChart.data.labels = ["updated1", "updated2", "updated3", "updated4"]

    // Display updated chart
    myChart.update()
}

// Function to handle clicks on graph bars. Can update so that on click, all the pomodoros for the
// respective course are displayed below graph.
function clickHandler(evt) {
    const points = myChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);

    if (points.length) {
        const firstPoint = points[0];
        const label = myChart.data.labels[firstPoint.index];
        const value = myChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
        console.log(label) // name of clicked course. Can be updated with a display function to eventually
        // display all the pomodoros for that subject.
    }
}

canvasElement.onclick = clickHandler;