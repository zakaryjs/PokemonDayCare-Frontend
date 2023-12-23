import Particles from "react-particles";
import { loadFull } from "tsparticles";
import particleConfig from "../utils/particleConfig";

// background particles component

export default function BackgroundParticles() {
  // load the particles before rendering the particles background
    async function loadParticles(main) {
        await loadFull(main)
      }

      return (
        <Particles id="tsparticles" init={loadParticles} options={particleConfig}/>
      )
}