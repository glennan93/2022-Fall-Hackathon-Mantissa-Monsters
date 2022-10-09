export default class timer {
    constructor(root) {
        root.innerHTML = timer.getHTML();

        this.el= {
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
            control: root.querySelector(".timer__btn--control"),
            reset: root.querySelector(".timer__btn--timer-reset"),
            pomtime: root.querySelector(".timer__btn--timer-25"),
            breaktime: root.querySelector(".timer__btn--timer-5")
        };

        this.interval = null;
        this.remainingSeconds = 10;
        this.timerType = "task";
        

        this.updateInterfaceStartStop();
        this.updateInterfaceTime();

        this.el.control.addEventListener("click", () => {
            if (this.interval === null) {
                this.start();
            }
            else {
                this.stop();
            }
        });

        this.el.reset.addEventListener("click", () => {
            this.stop();
            this.remainingSeconds = 10;
            this.formReset();
            this.updateInterfaceTime();
        });
        
        this.el.pomtime.addEventListener("click", () => {
            this.stop();
            this.remainingSeconds = 10;
            this.timerType = "task"
            this.formReset();
            this.updateInterfaceTime();
        });

        this.el.breaktime.addEventListener("click", () => {
            this.stop();
            this.remainingSeconds = 3;
            this.timerType = "break";
            this.formReset();
            this.updateInterfaceTime();
        });
    }
    

    //start function

    start() {
        if (this.remainingSeconds === 0) return;

        //counts down and updates ui according to timer
        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateInterfaceTime();

            if (this.remainingSeconds === 0) {
                if (this.timerType === "task"){
                    document.getElementById("subject").disabled = false;
                    document.getElementById("comments").disabled = false;
                    document.getElementById("form-submit").disabled = false;
                    document.getElementsByClassName("form-container")[0].style.border = "10px solid";
                    document.getElementsByClassName("form-container")[0].style.borderColor = "yellow";
                    alert("Well done! Please fill out Session Info form to document your progress.");
                } else if (this.timerType === "break"){
                    alert ("Break is over. Let's start 25 minutes!");
                }
                this.stop();
            }
        }, 1000);

        //used to update start and stop buttons
        this.updateInterfaceStartStop();
    }

    stop() {
        clearInterval(this.interval);

        this.interval = null;

        this.updateInterfaceStartStop();
    }

    //function to update countdown
    updateInterfaceTime() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
              
        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }


    //switches from play to pause button
    updateInterfaceStartStop() {
        //if timer isn't running, start it and switch to pause button
        if (this.interval === null) {
            this.el.control.innerHTML = `<span class="material-symbols-outlined">play_arrow</span>`;
            this.el.control.classList.add("timer__btn--start");
            this.el.control.classList.remove("timer__btn--pause");
        } 
        //if timer is already running, pause it and switch to play button
        else {
            this.el.control.innerHTML = `<span class="material-symbols-outlined">pause</span>`;
            this.el.control.classList.add("timer__btn--pause");
            this.el.control.classList.remove("timer__btn--start");
        }
    }

    formReset(){
        document.getElementById("subject").disabled = true;
        document.getElementById("comments").disabled = true;
        document.getElementById("form-submit").disabled = true;
        document.getElementsByClassName("form-container")[0].style.border = null;
        document.getElementsByClassName("form-container")[0].style.borderColor = null;
    }

    //static html for webpage
    static getHTML() {
        return `
            <div class="row">
                <span class="timer__part timer__part--minutes">00</span>
                <span class="timer__part">:</span>
                <span class="timer__part timer__part--seconds">00</span>
                <button type="button" class="timer__btn timer__btn--control timer__btn--start">
                    <span class="material-symbols-outlined">play_arrow</span>
                </button>                
                <button type="button" class="timer__btn timer__btn--control timer__btn--timer-reset">
                <span class="material-symbols-outlined">timer</span>
                </button>

                <button type="button" class="timer__btn timer__btn--control timer__btn--timer-25">
                25 Min
                </button>

                <button type="button" class="timer__btn timer__btn--control timer__btn--timer-5">
                5 Min
                </button>
            </div>
        `;
    }
}