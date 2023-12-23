// particle config is for use with the BackgroundParticles component
let particleConfig = {
    "fullScreen": {
        "enable": true,
        "zIndex": -1
    },
    "particles": {
        "number": {
            "value": 40,
            "density": {
                "enable": false,
                "value_area": 800
            }
        },
        "color": {
            "value": "#93F7A7"
        },
        "shape": {
            "type": "circle",
        },
        "opacity": {
            "value": 0.8,
        },
        "size": {
            "value": 3,
            "random": false,
        },
        "rotate": {
            "value": 0,
            "random": true,
            "direction": "clockwise",
            "animation": {
                "enable": true,
                "speed": 5,
                "sync": false
            }
        },
        "move": {
            "enable": true,
            "speed": 1,
        },
        "wobble": {
          "enable": true,
          "distance": 1
        }
    },
    "retina_detect": true,
    "background": {
        "color": "#F2EFDC",
        "position": "50% 50%",
        "repeat": "no-repeat",
        "size": "cover"
    }
}

export default particleConfig