import React from 'react';

const HEIGHT = 300;
const WIDTH = 300;

class Scratch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawing: false,
      startX: 0,
      startY: 0
    };
    this.canvasRef = React.createRef();
  }

  componentDidMount = () => {
    const canvas = this.canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.addEventListener("mousedown", this.scratchStart);
    canvas.addEventListener("mousemove", this.scratch);
    canvas.addEventListener("mouseup", this.scratchEnd);

    canvas.addEventListener("touchstart", this.scratchStart);
    canvas.addEventListener("touchmove", this.scratch);
    canvas.addEventListener("touchend", this.scratchEnd);

    context.fillStyle = "#ddd";
    context.fillRect(0, 0, WIDTH, HEIGHT);
    context.lineWidth = 30;
    context.lineJoin = "round";
  };

  scratchStart = e => {
    const { layerX, layerY } = e;

    this.setState({
      isDrawing: true,
      startX: layerX,
      startY: layerY
    });
  };

  scratch = e => {
    e.preventDefault();
    const { layerX, layerY } = e;
    const context = this.canvasRef.current.getContext("2d");

    if (!this.state.isDrawing) {
      return;
    }

    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    context.moveTo(this.state.startX, this.state.startY);
    context.lineTo(layerX, layerY);
    context.closePath();
    context.stroke();

    this.setState({
      startX: layerX,
      startY: layerY
    });
  };

  scratchEnd = e => {
    this.setState({
      isDrawing: false
    });
  };

  render() {
    return (
      <canvas
        ref={this.canvasRef}
        id="canvas"
        width={`${WIDTH}px`}
        height={`${HEIGHT}px`}
      />
    );
  }
}

export default Scratch;
