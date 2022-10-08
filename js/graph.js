const canvasElement = document.getElementById("pomodoro-chart");

const xValues = ["test1", "test2", "test3", "test4"]; // update with default array of courses for that user from database
const yValues = [1, 2, 3, 4]; // update with array of course pomodoros
const dates = ["2022-01-01", "2022-02-01", "2022-03-01", "2022-04-01", "2022-05-01", ]; // list of all dates user has inputted pomodoros for, will be filtered later

const barColors = ['rgb(255, 99, 132, 0.2)', 'rgb(0, 255, 0, 0.2']; // can add more, color alternates each bar
const barMarginColors = ['rgb(255, 99, 132)', 'rgb(0, 255, 0)'];

function makeGraph(courses, pomodoros){

}
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

// Function to handle clicks on graph bars. Can update so that on click, all the pomodoros for the
// respective course are displayed below graph.
function clickHandler(evt) {
    const points = myChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);

    if (points.length) {
        const firstPoint = points[0];
        const label = myChart.data.labels[firstPoint.index];
        const value = myChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
        // console.log(label) // name of clicked course. Can be updated with a display function to eventually
        // display all the pomodoros for that subject.
    }
}

// Function that will filter dates of pomodoros to represent in graph based upon user date selection. 
function filterPomodorosByDate(){
    const openingDate = new Date(document.getElementById("opening-date").value);
    const closingDate = new Date(document.getElementById("closing-date").value);
    
    // filteredDates array includes only dates betwen selected date range
    filteredDates = dates.filter((date) => (openingDate.getTime() <= new Date(date).getTime() && new Date(date).getTime() <= closingDate.getTime()));

    // I am not sure how to trigger re-render of graph with updated date range.
    // Re-rendered graph would require the updated pomodoro counts (yValues) for the updated course list (xValues) in that period
}

canvasElement.onclick = clickHandler;