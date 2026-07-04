const particles = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  className: `post-particle post-particle-${(index % 10) + 1}`,
}));

export default function PostHeroParticles() {
  return (
    <div className="post-hero-particles" aria-hidden="true">
      <div className="particle-orb particle-orb-a" />
      <div className="particle-orb particle-orb-b" />
      {particles.map((particle) => (
        <span className={particle.className} key={particle.id} />
      ))}
    </div>
  );
}
