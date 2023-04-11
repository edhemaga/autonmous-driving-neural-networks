class Controls {
    constructor() {
        this.forwards = false;
        this.backwards = false;
        this.left = false;
        this.right = false;

        //Call function for listing on keyboard events
        this.keyboardListeners();
    }

    //Function which detects which keys is pressed if matching key is pressed changed the direction of moving
    //If matching key is released, stop the direction of moving
    keyboardListeners = () => {
        document.onkeydown = (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    this.left = true;
                    break;
                case 'ArrowRight':
                    this.right = true;
                    break;
                case 'ArrowUp':
                    this.forwards = true;
                    break;
                case 'ArrowDown':
                    this.backwards = true;
                    break;
            }
        }
        document.onkeyup = (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    this.left = false;
                    break;
                case 'ArrowRight':
                    this.right = false;
                    break;
                case 'ArrowUp':
                    this.forwards = false;
                    break;
                case 'ArrowDown':
                    this.backwards = false;
                    break;
            }
        }
    }
}