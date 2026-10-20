import { motion } from 'motion/react';

/**
 * Scroll-triggered fade/slide-in. Reduced-motion is handled globally by
 * <MotionConfig reducedMotion="user"> in App.jsx (transforms are skipped).
 */
export default function Reveal({ children, delay = 0, y = 20, as = 'div', className = '' }) {
  const Component = motion[as] || motion.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
