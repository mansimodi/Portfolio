import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Awards from '../components/Awards';
import Speaking from '../components/Speaking';

export default function Work() {
  return (
    <div className="pt-28 md:pt-32">
      <Projects />
      <Speaking />
      <Skills />
      <Awards />
    </div>
  );
}
