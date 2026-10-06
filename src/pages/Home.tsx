import Hero from '../components/Hero';
import Bio from '../components/Bio';
import Impact from '../components/Impact';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="contour-rule mx-4 md:mx-24" aria-hidden="true" />
      <Bio />
      <Impact />
    </>
  );
}
