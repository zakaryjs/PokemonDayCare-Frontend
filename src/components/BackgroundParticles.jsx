import Particles from "react-particles";
import { loadFull } from "tsparticles";
import particleConfig from "../utils/particleConfig";


export default function BackgroundParticles() {
    async function loadParticles(main) {
        await loadFull(main)
      }

      return (
        <Particles id="tsparticles" init={loadParticles} options={particleConfig}/>
      )
}