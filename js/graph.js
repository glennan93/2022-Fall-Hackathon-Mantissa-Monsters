const canvasElement = document.getElementById("pomodoro-chart");

const xValues = ["CS161", "CS162", "CS290", "CS261"]; // update with array of courses, get from database
const yValues = [0, 0, 0, 0]; // update with array of course pomodoros, get from database
const dates = ["2022-01-01", "2022-02-01", "2022-03-01", "2022-04-01", "2022-05-01", ]; // get from database, list of all dates user has inputted pomodoros for, will be filtered later

const barColors = ['rgb(255, 99, 132, 0.2)', 'rgb(0, 255, 0, 0.2']; // can add more, alternates each bar
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

// Function to handle clicks on graph bars. Can update so that on click, all the pomodoros for the
// respective course are displayed below graph.
function clickHandler(evt) {
    const points = myChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);

    if (points.length) {
        const firstPoint = points[0];
        const label = myChart.data.labels[firstPoint.index];
        const value = myChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
        console.log(label) // name of clicked course. Can be updated with a display function.
    }
}

function filterPomodorosByDate(){
    const datesCopy = [...dates];
    console.log(datesCopy);
    const openingDate = new Date(document.getElementById("opening-date").value);
    const closingDate = new Date(document.getElementById("closing-date").value);
    
    // filteredDates to only include dates between opening-date and closing-date
    filteredDates = datesCopy.filter((date) => (openingDate.getTime() <= new Date(date).getTime() && new Date(date).getTime() <= closingDate.getTime()));

    console.log(filteredDates)
}

canvasElement.onclick = clickHandler;