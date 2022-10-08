const canvasElement = document.getElementById("pomodoro-chart");

const xValues = ["CS161", "CS162", "CS290", "CS261"]; // update with array of courses, get from database
const yValues = [8, 10, 5, 2]; // update with array of course pomodoros, get from database
const barColors = ['rgb(255, 99, 132, 0.2)', 'rgb(0, 255, 0, 0.2']; // can add more, alternates each bar
const barMarginColors = ['rgb(255, 99, 132)', 'rgb(0, 255, 0)'];

const data = {
    labels: xValues,
    datasets: [{
        label: ["Pomodoros", "yo"],
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
            }
        }
    };

const myChart = new Chart(canvasElement, config);