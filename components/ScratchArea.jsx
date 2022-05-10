import React from "react";
import { ScratchOff } from "@sky790312/react-scratch-off";
import shiny from "../play/shiny.jpeg";

function ScratchArea() {
  return (
    <div>
      <ScratchOff
        width={800}
        height={800}
        coverImgSrc={
          "data:image/png;base64,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"
        }
        revealPercentage={80}
      >
        {/* <img
          src={
            "https://media.istockphoto.com/photos/clown-emoticon-on-white-background-circus-emoji-3d-rendering-picture-id1319947873?b=1&k=20&m=1319947873&s=170667a&w=0&h=r9kSv5JMb46YZgDuqT76N2pkZPJy7yXgqe2850vUbTo="
          }
        ></img> */}
      </ScratchOff>
    </div>
  );
}

export default ScratchArea;