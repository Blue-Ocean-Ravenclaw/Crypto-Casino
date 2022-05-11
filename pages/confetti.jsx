import { realConfetti, fireWorksConfetti } from "../lib/confetti.js";
export default function Confetti() {
  // realConfetti(true);
  fireWorksConfetti(false);
  return <div>confetti</div>;
}
