import ScrollyCanvas from '../components/ScrollyCanvas';
import Bio from '../components/Bio';
import Impact from '../components/Impact';

export default function Home() {
  return (
    <>
      <div className="relative">
        <ScrollyCanvas frameCount={120} />
      </div>
      <Bio />
      <div className="contour-rule mx-4 md:mx-24" aria-hidden="true" />
      <Impact />
    </>
  );
}
