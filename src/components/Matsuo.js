import { OrbitControls, CameraShake } from '@react-three/drei'
import { useControls } from 'leva'
import { Particles } from './Particles'

export default function Matsuo() {
  const props = useControls({
    focus: { value: 8, min: 3, max: 11, step: 0.01 },
    speed: { value: 14, min: 0.1, max: 100, step: 0.1 },
    aperture: { value: 5.5, min: 1, max: 11, step: 0.05 },
    fov: { value: 0, min: 0, max: 200 },
    curl: { value: 0.42, min: 0.01, max: 0.5, step: 0.01 }
  })
  return (
    <>
      <OrbitControls makeDefault autoRotate autoRotateSpeed={2.5} enableZoom={false} />
      <CameraShake yawFrequency={1} maxYaw={0.05} pitchFrequency={1} maxPitch={0.05} rollFrequency={0.5} maxRoll={0.5} intensity={0.2} />
      <Particles {...props} />
    </>
  )
}
