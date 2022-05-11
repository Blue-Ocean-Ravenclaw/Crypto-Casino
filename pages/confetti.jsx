import { realConfetti, fireWorksConfetti } from "../lib/confetti.js";
export default function Confetti() {
  // realConfetti(false);
  fireWorksConfetti(true);
  return <div>confetti</div>;
}
