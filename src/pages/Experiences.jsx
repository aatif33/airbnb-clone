import ExperienceRow from "../components/experiences/ExperienceRow";
import { experiences } from "../data/experiences";

export default function Experiences() {
  return (
    <main className="max-w-7xl mx-auto px-6">
      <ExperienceRow
        title="Airbnb Originals"
        subtitle="Hosted by the world's most interesting people"
        data={experiences.originals}
      />

      <ExperienceRow
        title="Experiences in Bengaluru"
        data={experiences.local}
      />
    </main>
  );
}
